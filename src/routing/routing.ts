import {
  State,
  SearchActions,
  Matcher,
  DisplayableFacet,
  DisplayableFacetOption,
  NumberRangeValue,
  LowerNumberRangeLimit,
  UpperNumberRangeLimit,
  SelectableStaticFilter,
} from "@yext/search-headless-react";

export interface Router {
  serializeState: (state: State) => URLSearchParams | undefined;
  deserializeParams: (
    params: URLSearchParams,
    actions: SearchActions,
    pageLimit?: number
  ) => void;
  updateCadence: "onStateChange" | "onSearch";
  includeFacets?: boolean;
}

export const defaultRouter: Router = {
  updateCadence: "onSearch",
  // this function does not return a verticalKey param because it is inferred to be already set
  // TODO: add support for sort
  serializeState: (state) => {
    // Page limit defaults to 20
    const pageLimit = state.vertical.limit ?? 20;

    // page number depends on the current offset and the page limit
    const pageNumber = state.vertical.offset
      ? Math.floor(state.vertical.offset / pageLimit) + 1
      : 1;

    // check if there are any selected facets or static filters
    const selectedFacetCount =
      state.filters.facets?.filter((facet) =>
        facet.options.some((option) => option.selected)
      ).length ?? 0;
    const selectedStaticFilterCount =
      state.filters.static?.filter((staticFilter) => staticFilter.selected)
        .length ?? 0;

    if (
      selectedFacetCount > 0 ||
      selectedStaticFilterCount > 0 ||
      state.query.input ||
      pageNumber > 1
    ) {
      const params = new URLSearchParams();
      if (state.query.input) {
        params.set("query", state.query.input);
      }
      if (pageNumber > 1) {
        params.set("page", pageNumber.toString());
      }
      if (state.filters.facets) {
        serializeFacets(state, params);
      }
      if (state.filters.static) {
        serializeStaticFilters(state, params);
      }
      return params;
    }
  },
  deserializeParams: (params, actions, pageLimit) => {
    // const verticalKey = params.get("verticalKey");
    const query = params.get("query");
    const page = params.get("page");

    if (query) {
      actions.setQuery(query);
    }

    if (page) {
      actions.setOffset(
        pageLimit ? (parseInt(page) - 1) * pageLimit : (parseInt(page) - 1) * 20
      );
    }

    actions.setFacets(deserializeFacets(params));
    actions.setStaticFilters(deserializeStaticFilters(params));

    actions.executeVerticalQuery();
  },
};

// function that serilizes the selected facets into a URLSearchParams object
const serializeFacets = (state: State, params: URLSearchParams) => {
  const facets = state.filters.facets;

  if (facets) {
    facets.forEach((facet) => {
      const selectedFacetOptions = facet.options
        .filter((option) => option.selected)
        .map((option) => {
          // runtime check to see if option.value is a NumberRangeFilter
          if (option.matcher === Matcher.Between) {
            return serializeNumberRangeValue(
              facet.fieldId,
              option.value as NumberRangeValue
            );
          }
          return option.value;
        });

      if (selectedFacetOptions.length > 0) {
        params.set(facet.fieldId, selectedFacetOptions.join(","));
      }
    });
  }
};

// regex for any string that starts with f_
const filterFieldIdRegex = /^f_/;

const deserializeFacets = (params: URLSearchParams): DisplayableFacet[] => {
  // filter out the params that are not facets
  const facetParams = Array.from(params.entries()).filter(
    ([key]) =>
      !["query", "page", "verticalKey"].includes(key) &&
      !filterFieldIdRegex.test(key)
  );

  // map the facet params to a DisplayableFacet object
  const selectedFacets: DisplayableFacet[] = facetParams.map((facet) => {
    const [fieldId, selectedOptions] = facet;

    const options: DisplayableFacetOption[] = selectedOptions
      .split(",")
      .map((option) => {
        // use rangeRegex to check if selectedOptions is a range
        if (option.includes("=" || ">" || "<")) {
          const numberRangeOption = deserializeNumberRangeValue(
            fieldId,
            option
          );
          return {
            value: numberRangeOption,
            selected: true,
            matcher: Matcher.Between,
            displayName: fieldId,
            count: 0,
          };
        } else {
          return {
            value: option,
            selected: true,
            matcher: Matcher.Equals,
            // TODO: ask about this interface
            count: 0,
            displayName: fieldId,
          };
        }
      });

    return {
      fieldId,
      options,
      displayName: fieldId,
      matcher: Matcher.Equals,
    };
  });
  return selectedFacets;
};

const serializeStaticFilters = (state: State, params: URLSearchParams) => {
  const staticFilters = state.filters.static;
  if (staticFilters) {
    staticFilters
      .filter((staticFilter) => staticFilter.selected)
      .forEach((staticFilter) => {
        const filter = staticFilter.filter;
        switch (filter.kind) {
          case "fieldValue":
            if (filter.matcher === Matcher.Between) {
              const range = filter.value as NumberRangeValue;
              params.set(
                `f_${filter.fieldId}`,
                serializeNumberRangeValue(filter.fieldId, range)
              );
            } else {
              params.set(`f_${filter.fieldId}`, filter.value.toString());
            }
            break;
          // TODO: handle other filter kinds
          case "conjunction":
            break;
          case "disjunction":
            break;
          default:
            return;
        }
      });
    return params;
  }
};

const deserializeStaticFilters = (
  params: URLSearchParams
): SelectableStaticFilter[] => {
  const filterParams = Array.from(params.entries()).filter(([key]) =>
    filterFieldIdRegex.test(key)
  );

  const selectedStaticFilters: SelectableStaticFilter[] = filterParams.map(
    (filter) => {
      const [fieldId, value] = filter;
      const filterId = fieldId.replace("f_", "");

      if (value.includes("=" || ">" || "<")) {
        const range = deserializeNumberRangeValue(filterId, value);
        return {
          filter: {
            kind: "fieldValue",
            fieldId: filterId,
            value: range,
            matcher: Matcher.Between,
          },
          selected: true,
        };
      } else {
        return {
          filter: {
            kind: "fieldValue",
            fieldId: filterId,
            value,
            matcher: Matcher.Equals,
          },
          selected: true,
        };
      }
    }
  );
  return selectedStaticFilters;
};

const rangeMatcherSymbols: Record<
  Exclude<
    Matcher,
    Matcher.Equals | Matcher.NotEquals | Matcher.Near | Matcher.Between
  >,
  string
> = {
  [Matcher.GreaterThan]: ">",
  [Matcher.GreaterThanOrEqualTo]: ">=",
  [Matcher.LessThan]: "<",
  [Matcher.LessThanOrEqualTo]: "<=",
};

const serializeNumberRangeValue = (
  fieldId: string,
  value: NumberRangeValue
): string => {
  let rangeStr = fieldId;
  if (value.start) {
    rangeStr =
      value.start.value + rangeMatcherSymbols[value.start.matcher] + rangeStr;
  }
  if (value.end) {
    rangeStr =
      rangeStr + rangeMatcherSymbols[value.end.matcher] + value.end.value;
  }
  return rangeStr;
};

const deserializeNumberRangeValue = (
  fieldId: string,
  rangeStr: string
): NumberRangeValue => {
  const numberRangeOption: NumberRangeValue = {};
  // get the string on the left and right side of fieldId in the selectedOptions string
  const [start, end] = rangeStr.split(fieldId);

  if (start) {
    let startMatcher: LowerNumberRangeLimit["matcher"] | undefined;
    // find the matcher symbol in start and get the matcher
    if (start.includes(">=")) {
      startMatcher = Matcher.GreaterThanOrEqualTo;
    } else if (start.includes(">")) {
      startMatcher = Matcher.GreaterThan;
    }

    if (startMatcher) {
      // get the value of the range
      const startValue = start.replace(rangeMatcherSymbols[startMatcher], "");

      numberRangeOption.start = {
        value: Number(startValue),
        matcher: startMatcher,
      };
    } else {
      console.warn("Invalid lower limit matcher. Cannot parse range facet.");
    }
  }

  if (end) {
    let endMatcher: UpperNumberRangeLimit["matcher"] | undefined;
    // find the matcher symbol in start and get the matcher
    if (end.includes("<=")) {
      endMatcher = Matcher.LessThanOrEqualTo;
    } else if (end.includes("<")) {
      endMatcher = Matcher.LessThan;
    }

    if (endMatcher) {
      // get the value of the range
      const endValue = end.replace(rangeMatcherSymbols[endMatcher], "");

      numberRangeOption.end = {
        value: Number(endValue),
        matcher: endMatcher,
      };
    } else {
      console.warn("Invalid upper limit matcher. Cannot parse range facet.");
    }
  }

  return numberRangeOption;
};

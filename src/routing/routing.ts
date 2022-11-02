import {
  State,
  SearchActions,
  Matcher,
  DisplayableFacet,
  DisplayableFacetOption,
  NumberRangeValue,
  LowerNumberRangeLimit,
  UpperNumberRangeLimit,
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
  // TODO: add support for price range slider
  serializeState: (state) => {
    let params = serializeFacets(state);

    // Page limit defaults to 20
    const pageLimit = state.vertical.limit ?? 20;

    // page number depends on the current offset and the page limit
    const pageNumber = state.vertical.offset
      ? Math.floor(state.vertical.offset / pageLimit) + 1
      : 1;

    if (params || state.query.input || pageNumber > 1) {
      if (!params) {
        params = new URLSearchParams();
      }
      if (state.query.input) {
        params.set("query", state.query.input);
      }
      if (pageNumber > 1) {
        params.set("page", pageNumber.toString());
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

    actions.executeVerticalQuery();
  },
};

// function that serilizes the selected facets into a URLSearchParams object
const serializeFacets = (state: State): URLSearchParams | undefined => {
  const facets = state.filters.facets;

  if (facets) {
    const params = new URLSearchParams();
    facets.forEach((facet) => {
      const selectedFacetOptions = facet.options
        .filter((option) => option.selected)
        .map((option) => {
          // runtime check to see if option.value is a NumberRangeFilter
          if (typeof option.value === "object") {
            let rangeStr = facet.fieldId;
            if (option.value.start) {
              rangeStr =
                option.value.start.value +
                rangeMatcherSymbols[option.value.start.matcher] +
                rangeStr;
            }
            if (option.value.end) {
              rangeStr =
                rangeStr +
                rangeMatcherSymbols[option.value.end.matcher] +
                option.value.end.value;
            }
            return rangeStr;
          }
          return option.value;
        });

      if (selectedFacetOptions.length > 0) {
        params.set(facet.fieldId, selectedFacetOptions.join(","));
      }
    });
    return params;
  }
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

const deserializeFacets = (params: URLSearchParams): DisplayableFacet[] => {
  // filter out the params that are not facets
  const facetParams = Array.from(params.entries()).filter(
    ([key]) => !["query", "page", "verticalKey"].includes(key)
  );
  // map the facet params to a DisplayableFacet object
  const selectedFacets: DisplayableFacet[] = facetParams.map((facet) => {
    const [fieldId, selectedOptions] = facet;

    const options: DisplayableFacetOption[] = selectedOptions
      .split(",")
      .map((option) => {
        // use rangeRegex to check if selectedOptions is a range
        if (rangeRegex.test(selectedOptions)) {
          const numberRangeOption: NumberRangeValue = {};
          // get the string on the left and right side of fieldId in the selectedOptions string
          const [start, end] = option.split(fieldId);

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
              const startValue = start.replace(
                rangeMatcherSymbols[startMatcher],
                ""
              );

              numberRangeOption.start = {
                value: Number(startValue),
                matcher: startMatcher,
              };
            } else {
              console.warn(
                "Invalid lower limit matcher. Cannot parse range facet."
              );
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
              console.warn(
                "Invalid upper limit matcher. Cannot parse range facet."
              );
            }
          }

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

// range regex
const rangeRegex = /([><]=?)([^><=]+)([><]=?)([^><=]+)/;

import {
  useSearchActions,
  useSearchState,
  provideHeadless,
  VerticalResults as VerticalResultsData,
  Result,
  HighlightedValue,
} from "@yext/search-headless-react";
import {
  DropdownItem,
  renderHighlightedValue,
  SearchBar as SB,
  SearchBarProps,
} from "@yext/search-ui-react";
import * as React from "react";
import searchConfig from "../../config/searchConfig";
import { Beverage } from "../../types/beverages";
import BeverageCategory from "../../types/beverage_categories";
import { removeQueryParam, setQueryParam } from "../../util";
import { BeverageCard } from "./BeverageCard";
import CategoryDropdownItem from "./CategoryDropdownItem";

const SearchBar = (props: SearchBarProps) => {
  const searchActions = useSearchActions();
  const verticalKey = useSearchState((s) => s.vertical.verticalKey);

  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "entity-preview-searcher",
  });

  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const beverageCategories = verticalKeyToResults[
      "beverage_categories"
    ]?.results.map((result) => result) as unknown as Result<BeverageCategory>[];

    const beverageResults = verticalKeyToResults["beverages"]?.results.map(
      (result) => result
    ) as unknown as Result<Beverage>[];

    return (
      <div className="max-h-max overflow-y-scroll sm:max-h-96 sm:shadow-2xl">
        {renderBeverageCategoryDropdown(beverageCategories)}
        {renderBeveragesDropdown(beverageResults)}
      </div>
    );
  };

  const renderBeverageCategoryDropdown = (
    results: Result<BeverageCategory>[]
  ): JSX.Element => {
    if (!results || results.length === 0) return <></>;

    return (
      <div>
        {results.slice(0, 3).map((result) => {
          const title: string | Partial<HighlightedValue> =
            (result.highlightedFields?.name as unknown as string) ??
            (result.name as Partial<HighlightedValue>);

          return title && result.name ? (
            // TOOD: why doesn't this work?
            // <CategoryDropdownItem name={result.name} />
            <DropdownItem
              value={result.name}
              // onClick={() => searchHandler(categoryUrl)}
            >
              <div className="py-3 px-4 hover:bg-gray-200">
                {renderHighlightedValue(title, {
                  nonHighlighted: "text-black text-base ",
                  highlighted: "text-dark-orange text-base font-black",
                })}
              </div>
              <div className="mx-2.5 h-px bg-gray-200" />
            </DropdownItem>
          ) : (
            <></>
          );
        })}
      </div>
    );
  };

  const renderBeveragesDropdown = (results: Result<Beverage>[]) => {
    if (!results || results.length === 0) return <></>;

    return results.map((result) => {
      const title = result.highlightedFields?.name ?? result.name;

      return title && result.name ? (
        <DropdownItem value={result.name}>
          <BeverageCard result={result} />
          <div className="mx-2.5 h-px bg-gray-200" />
        </DropdownItem>
      ) : (
        <></>
      );
    });
  };

  return (
    <SB
      {...props}
      hideRecentSearches
      customCssClasses={{ searchBarContainer: "py-6 px-3 md:py-0 md:px-0" }}
      onSearch={(input) => {
        const { query } = input;
        if (query) {
          setQueryParam("query", query ?? "");
        } else {
          removeQueryParam("query");
        }

        if (verticalKey) {
          searchActions.setQuery(query ?? "");
          searchActions.executeVerticalQuery();
        } else {
          if (query) {
            searchActions.setQuery(query);
            searchActions.executeUniversalQuery();
          }
        }

        props.onSearch?.(input);
      }}
      visualAutocompleteConfig={{
        renderEntityPreviews,
        entityPreviewSearcher,
        includedVerticals: ["beverage_categories", "beverages"],
      }}
    />
  );
};

export default SearchBar;

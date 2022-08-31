import {
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import { Beverage } from "../../types/beverages";
import { BeverageCard } from "./BeverageCard";
import { useSearchState } from "@yext/search-headless-react";
import Filters from "./Filters";

const SearchResults = () => {
  const mostRecentSearch = useSearchState(
    (state) => state.query.mostRecentSearch
  );
  return (
    <>
      {mostRecentSearch && (
        <span className="text-bold border-b-2 border-dark-orange text-3xl font-bold">
          Results for
          <span className="text-dark-orange">{` "${mostRecentSearch}"`}</span>
        </span>
      )}
      <ResultsCount customCssClasses={{ resultsCountContainer: "py-3" }} />
      <Filters />
      <VerticalResults<Beverage>
        customCssClasses={{
          verticalResultsContainer: "grid grid-cols-2 md:grid-cols-3 gap-4",
        }}
        CardComponent={BeverageCard}
      />
      <Pagination />
    </>
  );
};

export default SearchResults;

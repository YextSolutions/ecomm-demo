import { ResultsCount } from "@yext/search-ui-react";
import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";
import { useState } from "react";
import BeverageResults from "./BeverageResults";

// TODO: DELETE
const SearchResults = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const mostRecentSearch = useSearchState(
    (state) => state.query.mostRecentSearch
  );
  return (
    <>
      {/* TODO: Componentize with title, breadcrumbs, results count */}
      {mostRecentSearch && (
        <span className="text-bold border-b-2 border-dark-orange text-3xl font-bold">
          Results for
          <span className="text-dark-orange">{` "${mostRecentSearch}"`}</span>
        </span>
      )}
      <ResultsCount customCssClasses={{ resultsCountContainer: "py-3" }} />
      <BeverageResults />
    </>
  );
};

export default SearchResults;

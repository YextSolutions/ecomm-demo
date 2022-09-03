import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";
import { Pagination, VerticalResults } from "@yext/search-ui-react";
import { BeverageCard } from "./BeverageCard";
import { Beverage } from "../../types/beverages";

const BeverageVerticalResults = () => {
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
      <VerticalResults<Beverage>
        customCssClasses={{
          verticalResultsContainer: "grid grid-cols-2 md:grid-cols-3 gap-4",
        }}
        CardComponent={BeverageCard}
      />
      {/* <Pagination
            customCssClasses={{
              selectedLabel: "-z-10",
              label: "-z-20",
              rightIconContainer: "-z-10",
              leftIconContainer: "-z-10",
            }}
          /> */}
    </>
  );
};

export default BeverageVerticalResults;

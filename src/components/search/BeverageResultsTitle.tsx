import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";

interface BeverageResultsTitleProps {
  title?: string;
}

const BeverageResultsTitle = ({ title }: BeverageResultsTitleProps) => {
  const mostRecentSearch = useSearchState(
    (state) => state.query.mostRecentSearch
  );

  // TODO: add breadcrumbs and results count
  return (
    <div className="py-8">
      <span className="text-bold border-b-2 border-dark-orange  text-3xl font-bold">
        {title ? (
          title
        ) : (
          <div>
            Results
            {mostRecentSearch && (
              <>
                <span>
                  &nbsp;for&nbsp;
                  <span className="text-dark-orange">{`"${mostRecentSearch}"`}</span>
                </span>
              </>
            )}
          </div>
        )}
      </span>
    </div>
  );
};

export default BeverageResultsTitle;

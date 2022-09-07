import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";
import { ResultsCount } from "@yext/search-ui-react";
import Breadcrumbs, { BreadcrumbsProps } from "../Breadcrumbs";
import SortingDropdown from "./SortingDropdown";

interface BeverageResultsTitleProps {
  title?: string;
  breadcrumbs?: BreadcrumbsProps;
}

const BeverageResultsTitle = ({
  title,
  breadcrumbs,
}: BeverageResultsTitleProps) => {
  const mostRecentSearch = useSearchState(
    (state) => state.query.mostRecentSearch
  );

  return (
    <div className="flex items-center justify-between py-8">
      <div>
        {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
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
        <ResultsCount customCssClasses={{ resultsCountContainer: "pt-4" }} />
      </div>
      <SortingDropdown containerCss="hidden md:flex" />
    </div>
  );
};

export default BeverageResultsTitle;

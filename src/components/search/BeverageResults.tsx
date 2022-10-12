import * as React from "react";
import { Pagination, ResultsCount } from "@yext/search-ui-react";
import { useSearchState } from "@yext/search-headless-react";
import { CategoryLink } from "../../types/kg";
import { BreadcrumbsProps } from "../Breadcrumbs";
import BeverageFilters from "./BeverageFilters";
import BeverageResultsTitle from "./BeverageResultsTitle";
import BeverageVerticalResults from "./BeverageVerticalResults";
import { ShakerLoader } from "../ShakerLoader";
import TransitionContainer from "../TransitionContainer";
import BottomButton from "../BottomButton";
import SortingDropdown from "./SortingDropdown";

interface BeverageResultsViewProps {
  title?: string;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
  bottomButtonOnClick: () => void;
}

const BeverageResults = ({
  title,
  breadcrumbs,
  categories,
  bottomButtonOnClick,
}: BeverageResultsViewProps): JSX.Element => {
  const [showResults, setShowResults] = React.useState(false);
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  // use effect hook that sets showResults to true 300 milliseconds after the search is done loading
  React.useEffect(() => {
    if (!searchLoading) {
      const timeout = setTimeout(() => {
        setShowResults(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchLoading]);

  return (
    <>
      {/* {coverPhoto && <CoverPhoto image={coverPhoto} />} */}
      <div className="flex items-center justify-between pt-8">
        <BeverageResultsTitle title={title} breadcrumbs={breadcrumbs} />
        <TransitionContainer show={showResults}>
          <SortingDropdown containerCss="hidden md:flex" />
        </TransitionContainer>
      </div>
      <TransitionContainer show={showResults}>
        <ResultsCount customCssClasses={{ resultsCountContainer: "pt-4" }} />
      </TransitionContainer>
      <div className="flex">
        <TransitionContainer show={showResults}>
          <div className="hidden pr-10 md:block">
            <BeverageFilters
              categories={categories}
              standardFacetsProps={{
                customCssClasses: {
                  optionLabel: "font-bold whitespace-nowrap",
                  optionInput: "text-orange focus:ring-orange ",
                },
                showMoreLimit: 5,
              }}
              numericalFacetProps={{
                customCssClasses: {
                  optionLabel: "font-bold whitespace-nowrap",
                  optionInput: "text-orange focus:ring-orange ",
                },
              }}
            />
          </div>
        </TransitionContainer>
        {searchLoading ? (
          <ShakerLoader />
        ) : (
          <TransitionContainer show={showResults}>
            <div className="flex flex-col">
              <BeverageVerticalResults />
              {/* TODO: Scroll to top on click */}
              <Pagination />
            </div>
          </TransitionContainer>
        )}
      </div>
      <div className="block md:hidden">
        <BottomButton
          label={"SORT / FILTER"}
          handleClick={bottomButtonOnClick}
        />
      </div>
    </>
  );
};

export default BeverageResults;

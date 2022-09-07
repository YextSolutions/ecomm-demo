import * as React from "react";
import { useSearchPageSetupEffect } from "../hooks/useLoadStateFromUrl";
import { CategoryLink, ComplexImage } from "../types/kg";
import { SelectableFilter } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import MobileFiltersView from "./search/mobile/MobileFiltersView";
import MobileBeverageResultsView from "./search/mobile/MobileBeverageResultsView";
import BeverageResultsView from "./search/BeverageResultsView";
import { useSearchActions } from "@yext/search-headless-react";
import { BreadcrumbsProps } from "./Breadcrumbs";

interface SearchLayoutProps {
  coverPhoto?: ComplexImage;
  title?: string;
  initialFilter?: SelectableFilter;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
}

const SearchLayout = ({
  coverPhoto,
  title,
  initialFilter,
  breadcrumbs,
  categories,
}: SearchLayoutProps): JSX.Element => {
  useSearchPageSetupEffect(initialFilter);

  const windowDimensions = useWindowDimensions();

  const [filtersOpen, setFiltersOpen] = useState(false);
  // using Tailwind md breakpoint

  const searchActions = useSearchActions();

  const handleBottomButton = () => {
    if (filtersOpen) {
      searchActions.executeVerticalQuery();
    }
    setFiltersOpen(!filtersOpen);
  };

  return (
    <>
      {filtersOpen ? (
        <MobileFiltersView
          bottomButtonOnClick={handleBottomButton}
          categories={categories}
        />
      ) : (
        windowDimensions &&
        // using tailwind md breakpoint
        (windowDimensions?.width < 768 ? (
          <MobileBeverageResultsView
            title={title}
            coverPhoto={coverPhoto}
            bottomButtonOnClick={handleBottomButton}
            breadcrumbs={breadcrumbs}
          />
        ) : (
          <BeverageResultsView
            title={title}
            coverPhoto={coverPhoto}
            breadcrumbs={breadcrumbs}
            categories={categories}
          />
        ))
      )}
    </>
  );
};

export default SearchLayout;

import * as React from "react";
import { useSearchPageSetupEffect } from "../hooks/useLoadStateFromUrl";
import { CategoryLink, ComplexImage } from "../types/kg";
import { SelectableFilter } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import MobileFiltersView from "./search/mobile/MobileFiltersView";
import MobileBeverageResultsView from "./search/mobile/MobileBeverageResultsView";
import BeverageResultsView from "./search/BeverageResultsView";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import { ShakerLoader } from "./ShakerLoader";
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

  const { width } = useWindowDimensions();

  const [filtersOpen, setFiltersOpen] = useState(false);
  // using Tailwind md breakpoint
  const [isMobile, setIsMobile] = useState(width < 768);

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);
  const searchActions = useSearchActions();

  const handleBottomButton = () => {
    if (filtersOpen) {
      searchActions.executeVerticalQuery();
    }
    setFiltersOpen(!filtersOpen);
  };

  const renderSearchResults = () => {
    if (isMobile) {
      return (
        <MobileBeverageResultsView
          title={title}
          coverPhoto={coverPhoto}
          bottomButtonOnClick={handleBottomButton}
          breadcrumbs={breadcrumbs}
        />
      );
    } else {
      return (
        <BeverageResultsView
          title={title}
          coverPhoto={coverPhoto}
          breadcrumbs={breadcrumbs}
          categories={categories}
        />
      );
    }
  };

  return (
    <>
      {filtersOpen ? (
        <MobileFiltersView
          bottomButtonOnClick={handleBottomButton}
          categories={categories}
        />
      ) : searchLoading ? (
        <ShakerLoader />
      ) : (
        renderSearchResults()
      )}
    </>
  );
};

export default SearchLayout;

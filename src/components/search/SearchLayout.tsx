import * as React from "react";
import { useSearchPageSetupEffect } from "../../hooks/useSearchPageSetupEffect";
import { CategoryLink, ComplexImage } from "../../types/kg";
import { SelectableStaticFilter } from "@yext/search-headless-react";
import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MobileFiltersView from "./mobile/MobileFiltersView";
import MobileBeverageResultsView from "./mobile/MobileBeverageResultsView";
import BeverageResultsView from "./BeverageResultsView";
import { useSearchActions } from "@yext/search-headless-react";
import { BreadcrumbsProps } from "../Breadcrumbs";
import { useLocationFilter } from "../../hooks/useLocationFilter";

interface SearchLayoutProps {
  coverPhoto?: ComplexImage;
  title?: string;
  initialFilter?: SelectableStaticFilter;
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
  useLocationFilter();

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

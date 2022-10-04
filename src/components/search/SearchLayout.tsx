import * as React from "react";
import { useSearchPageSetupEffect } from "../../hooks/useSearchPageSetupEffect";
import { CategoryLink, ComplexImage } from "../../types/kg";
import { SelectableStaticFilter } from "@yext/search-headless-react";
import { useState } from "react";
import MobileFiltersView from "./mobile/MobileFiltersView";
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
        <BeverageResultsView
          title={title}
          coverPhoto={coverPhoto}
          breadcrumbs={breadcrumbs}
          categories={categories}
          bottomButtonOnClick={handleBottomButton}
        />
        // ))
      )}
    </>
  );
};

export default SearchLayout;

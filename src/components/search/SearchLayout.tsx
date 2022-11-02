import * as React from "react";
import { useSearchPageSetupEffect } from "../../hooks/useSearchPageSetupEffect";
import { CategoryLink } from "../../types/kg";
import { SelectableStaticFilter } from "@yext/search-headless-react";
import { useState } from "react";
import MobileFiltersView from "./mobile/MobileFiltersView";
import BeverageResults from "./BeverageResults";
import { useSearchActions } from "@yext/search-headless-react";
import { BreadcrumbsProps } from "../Breadcrumbs";
import { useLocationFilter } from "../../hooks/useLocationFilter";

interface SearchLayoutProps {
  title?: string;
  initialFilter?: SelectableStaticFilter;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
}

const SearchLayout = ({
  title,
  initialFilter,
  breadcrumbs,
  categories,
}: SearchLayoutProps): JSX.Element => {
  // useSearchPageSetupEffect(initialFilter);
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
        <BeverageResults
          title={title}
          breadcrumbs={breadcrumbs}
          categories={categories}
          bottomButtonOnClick={handleBottomButton}
        />
      )}
    </>
  );
};

export default SearchLayout;

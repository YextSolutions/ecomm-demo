<<<<<<< HEAD
import * as React from "react";
import { useSearchPageSetupEffect } from "../hooks/useSearchPageSetupEffect";
import { CategoryLink, ComplexImage } from "../types/kg";
import { SelectableStaticFilter } from "@yext/search-headless-react";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import MobileFiltersView from "./search/mobile/MobileFiltersView";
import MobileBeverageResultsView from "./search/mobile/MobileBeverageResultsView";
import BeverageResultsView from "./search/BeverageResultsView";
import { useSearchActions } from "@yext/search-headless-react";
import { BreadcrumbsProps } from "./Breadcrumbs";
import { useLocationFilter } from "../hooks/useLocationFilter";
=======
import { Image } from "@yext/pages/components";
import * as React from "react";
import { CategoryPhoto, ComplexImage } from "../types/Site";
import CategoryLayout from "./CategoryLayout";
>>>>>>> c30bded (home page)

interface SearchLayoutProps {
  coverPhoto?: ComplexImage;
  title?: string;
<<<<<<< HEAD
  initialFilter?: SelectableStaticFilter;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
=======
  categoryPhotos?: CategoryPhoto[];
  categoryPhotoContainerCss?: string;
>>>>>>> c30bded (home page)
}

const SearchLayout = ({
  coverPhoto,
  title,
<<<<<<< HEAD
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
=======
  categoryPhotos,
  categoryPhotoContainerCss,
}: SearchLayoutProps): JSX.Element => {
  return (
    <>
      {coverPhoto && (
        <div className="flex justify-center">
          {/* TODO: Consider box shadow and rounding image edges */}
          <div className="my-8 flex h-44 w-96 justify-center sm:h-[21.75rem] sm:w-[42.75rem]">
            <Image layout="fill" image={coverPhoto} />
          </div>
        </div>
      )}
      {categoryPhotos && (
        <CategoryLayout
          title={title}
          categoryPhotos={categoryPhotos}
          containerCss={categoryPhotoContainerCss}
        />
>>>>>>> c30bded (home page)
      )}
    </>
  );
};

export default SearchLayout;

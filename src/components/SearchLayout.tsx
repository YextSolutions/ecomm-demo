import { Image } from "@yext/pages/components";
import * as React from "react";
import { CategoryPhoto, ComplexImage } from "../types/kg";
import CategoryLayout from "./CategoryLayout";
import SearchResults from "./search/SearchResults";

interface SearchLayoutProps {
  coverPhoto?: ComplexImage;
  title?: string;
  categoryPhotos?: CategoryPhoto[];
  categoryPhotoContainerCss?: string;
  verticalSearch?: boolean;
}

const SearchLayout = ({
  coverPhoto,
  title,
  categoryPhotos,
  categoryPhotoContainerCss,
  verticalSearch = false,
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
      )}
      {verticalSearch && <SearchResults />}
    </>
  );
};

export default SearchLayout;

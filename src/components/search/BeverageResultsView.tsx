import * as React from "react";
import { Pagination } from "@yext/search-ui-react";
import { useSearchState } from "@yext/search-headless-react";
import { CategoryLink, ComplexImage } from "../../types/kg";
import { BreadcrumbsProps } from "../Breadcrumbs";
import CoverPhoto from "../CoverPhoto";
import BeverageFilters from "./BeverageFilters";
import BeverageResultsTitle from "./BeverageResultsTitle";
import BeverageVerticalResults from "./BeverageVerticalResults";
import { ShakerLoader } from "../ShakerLoader";

interface BeverageResultsViewProps {
  title?: string;
  coverPhoto?: ComplexImage;
  breadcrumbs?: BreadcrumbsProps;
  categories?: CategoryLink[];
}

const BeverageResultsView = ({
  title,
  coverPhoto,
  breadcrumbs,
  categories,
}: BeverageResultsViewProps): JSX.Element => {
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  return (
    <>
      {coverPhoto && <CoverPhoto image={coverPhoto} />}
      <BeverageResultsTitle title={title} breadcrumbs={breadcrumbs} />
      <div className="flex">
        <div className="pr-10">
          <BeverageFilters
            categories={categories}
            standardFacetsProps={{
              customCssClasses: {
                optionLabel: "font-bold whitespace-nowrap",
                optionInput: "text-orange focus:ring-orange ",
              },
              showMoreLimit: 5,
            }}
          />
        </div>
        {searchLoading ? (
          <ShakerLoader />
        ) : (
          <div className="flex flex-col">
            <BeverageVerticalResults />
            <Pagination />
          </div>
        )}
      </div>
    </>
  );
};

export default BeverageResultsView;

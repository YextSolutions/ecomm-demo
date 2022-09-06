import { Pagination } from "@yext/search-ui-react";
import * as React from "react";
import { ComplexImage } from "../../types/kg";
import CoverPhoto from "../CoverPhoto";
import BeverageFilters from "./BeverageFilters";
import BeverageResultsTitle from "./BeverageResultsTitle";
import BeverageVerticalResults from "./BeverageVerticalResults";

interface BeverageResultsViewProps {
  title?: string;
  coverPhoto?: ComplexImage;
}

const BeverageResultsView = ({
  title,
  coverPhoto,
}: BeverageResultsViewProps): JSX.Element => {
  return (
    <>
      {coverPhoto && <CoverPhoto image={coverPhoto} />}
      <BeverageResultsTitle title={title} />
      <div className="flex">
        <div className="pr-10 md:block">
          <BeverageFilters
            standardFacetsProps={{
              customCssClasses: {
                optionLabel: "font-bold whitespace-nowrap",
                optionInput: "text-orange focus:ring-orange ",
              },
              showMoreLimit: 5,
            }}
          />
        </div>
        <BeverageVerticalResults />
      </div>
      <Pagination />
    </>
  );
};

export default BeverageResultsView;

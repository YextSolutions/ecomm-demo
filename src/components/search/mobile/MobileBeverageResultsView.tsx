import { Pagination } from "@yext/search-ui-react";
import * as React from "react";
import BottomButton from "../../BottomButton";
import BeverageResultsTitle from "../BeverageResultsTitle";
import BeverageVerticalResults from "../BeverageVerticalResults";
import { ComplexImage } from "../../../types/kg";
import CoverPhoto from "../../CoverPhoto";
import { BreadcrumbsProps } from "../../Breadcrumbs";
import { ShakerLoader } from "../../ShakerLoader";
import { useSearchState } from "@yext/search-headless-react";

interface MobileBeverageResultsViewProps {
  bottomButtonOnClick: () => void;
  title?: string;
  coverPhoto?: ComplexImage;
  breadcrumbs?: BreadcrumbsProps;
}

const MobileBeverageResultsView = ({
  bottomButtonOnClick,
  title,
  coverPhoto,
  breadcrumbs,
}: MobileBeverageResultsViewProps): JSX.Element => {
  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  return (
    <>
      {coverPhoto && <CoverPhoto image={coverPhoto} />}
      <BeverageResultsTitle title={title} breadcrumbs={breadcrumbs} />
      <div className="pb-16">
        {searchLoading ? (
          <ShakerLoader />
        ) : (
          <>
            <BeverageVerticalResults />
            <Pagination />
          </>
        )}
      </div>
      <BottomButton label={"SORT / FILTER"} handleClick={bottomButtonOnClick} />
    </>
  );
};

export default MobileBeverageResultsView;
import { Pagination } from "@yext/search-ui-react";
import * as React from "react";
import BottomButton from "../../BottomButton";
import BeverageResultsTitle from "../BeverageResultsTitle";
import BeverageVerticalResults from "../BeverageVerticalResults";
import { ComplexImage } from "../../../types/kg";
import CoverPhoto from "../../CoverPhoto";

interface MobileBeverageResultsViewProps {
  bottomButtonOnClick: () => void;
  title?: string;
  coverPhoto?: ComplexImage;
}

const MobileBeverageResultsView = ({
  bottomButtonOnClick,
  title,
  coverPhoto,
}: MobileBeverageResultsViewProps): JSX.Element => {
  return (
    <>
      {coverPhoto && <CoverPhoto image={coverPhoto} />}
      <BeverageResultsTitle title={title} />
      <div className="pb-16">
        <BeverageVerticalResults />
        <Pagination />
      </div>
      <BottomButton label={"SORT / FILTER"} handleClick={bottomButtonOnClick} />
    </>
  );
};

export default MobileBeverageResultsView;

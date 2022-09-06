import * as React from "react";
import { useSearchState } from "@yext/search-headless-react";
import BeverageFilters from "../BeverageFilters";
import BottomButton from "../../BottomButton";

interface MobileFiltersViewInterface {
  bottomButtonOnClick: () => void;
}
const MobileFiltersView = ({
  bottomButtonOnClick,
}: MobileFiltersViewInterface): JSX.Element => {
  useSearchState((state) => state.vertical.resultsCount);

  const resultsCount =
    useSearchState((state) => state.vertical.resultsCount) ?? 0;

  return (
    <>
      <div className="pb-16">
        <BeverageFilters
          standardFacetsProps={{
            customCssClasses: {
              standardFacetsContainer: "py-8",
              optionLabel: "font-bold text-base",
              optionInput: "text-orange focus:ring-orange w-7 h-7",
            },
            showMoreLimit: 5,
          }}
        />
      </div>
      <BottomButton
        label={`Show Results (${resultsCount})`}
        handleClick={bottomButtonOnClick}
      />
    </>
  );
};

export default MobileFiltersView;

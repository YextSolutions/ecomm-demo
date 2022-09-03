import * as React from "react";
import { Pagination } from "@yext/search-ui-react";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import { ShakerLoader } from "../ShakerLoader";
import BottomButton from "../BottomButton";
import { useState } from "react";
import BeverageVerticalResults from "./BeverageVerticalResults";
import BeverageFilters from "./BeverageFilters";

interface BeverageResultsViewProps {
  bottomButtonOnClick: () => void;
}

const BeverageResultsView = ({
  bottomButtonOnClick,
}: BeverageResultsViewProps): JSX.Element => {
  return (
    <>
      <div className="pb-16">
        <BeverageVerticalResults />
        <Pagination />
      </div>
      <BottomButton label={"SORT / FILTER"} handleClick={bottomButtonOnClick} />
    </>
  );
};

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
        <BeverageFilters />
      </div>
      <BottomButton
        // TODO: Add results count
        label={`Show Results (${resultsCount})`}
        handleClick={bottomButtonOnClick}
      />
    </>
  );
};

const BeverageResults = (): JSX.Element => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  const searchActions = useSearchActions();

  const handleBottomButton = () => {
    if (filtersOpen) {
      searchActions.executeVerticalQuery();
    }
    setFiltersOpen(!filtersOpen);
  };

  // TODO: Add NO_RESULTS view
  // TODO: Clean up logic: https://twitter.com/DavidKPiano/status/1564950527477252098
  return (
    <>
      {filtersOpen ? (
        <MobileFiltersView bottomButtonOnClick={handleBottomButton} />
      ) : searchLoading ? (
        <ShakerLoader />
      ) : (
        <BeverageResultsView bottomButtonOnClick={handleBottomButton} />
      )}
    </>
  );
};

export default BeverageResults;

import * as React from "react";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import { ShakerLoader } from "../ShakerLoader";
import { useState } from "react";
import BeverageResultsView from "./BeverageResultsView";
import MobileFiltersView from "./mobile/MobileFiltersView";

interface BeverageResultsProps {
  title?: string;
}

const BeverageResults = ({ title }: BeverageResultsProps): JSX.Element => {
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
        <BeverageResultsView title={title} />
      )}
    </>
  );
};

export default BeverageResults;

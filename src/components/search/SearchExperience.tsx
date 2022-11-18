import {
  // SearchHeadlessProvider,
  provideHeadless,
  SearchActions,
  SelectableStaticFilter,
  State,
} from "@yext/search-headless-react";
import * as React from "react";
import searchConfig from "../../config/searchConfig";
import { defaultRouter } from "../../routing/routing";
import SearchHeadlessProvider from "./SearchHeadlessProvider";

interface SearchExperienceProps {
  verticalKey?: string;
  children?: React.ReactNode;
  headlessId?: string;
  initialFilters?: SelectableStaticFilter[];
  excludedParams?: string[];
}

const SearchExperience = ({
  verticalKey = "beverages",
  children,
  headlessId,
  initialFilters,
  excludedParams: excludedFieldIds,
}: SearchExperienceProps) => {
  const searcher = provideHeadless({
    ...searchConfig,
    verticalKey: verticalKey,
  });
  return (
    <SearchHeadlessProvider
      searcher={searcher}
      routing={defaultRouter}
      initialFilters={initialFilters}
      excludedParams={excludedFieldIds}

      // {...searchConfig}
      // verticalKey={verticalKey}
      // headlessId={headlessId}
    >
      <StateManager>{children}</StateManager>
    </SearchHeadlessProvider>
  );
};

const StateManager = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SearchExperience;

import {
  // SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import * as React from "react";
import searchConfig from "../../config/searchConfig";
import { defaultRouter } from "../../routing/routing";
import SearchHeadlessProvider from "./SearchHeadlessProvider";

interface SearchExperienceProps {
  verticalKey?: string;
  children?: React.ReactNode;
  headlessId?: string;
}

const SearchExperience = ({
  verticalKey = "beverages",
  children,
  headlessId,
}: SearchExperienceProps) => {
  const searcher = provideHeadless({
    ...searchConfig,
    verticalKey: verticalKey,
  });
  return (
    <SearchHeadlessProvider
      searcher={searcher}
      routing={defaultRouter}
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

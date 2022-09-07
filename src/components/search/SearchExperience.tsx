import { SearchHeadlessProvider } from "@yext/search-headless-react";
import * as React from "react";
import searchConfig from "../../config/searchConfig";

interface SearchExperienceProps {
  verticalKey?: string;
  children?: React.ReactNode;
  headlessId?: string;
}

const SearchExperience = ({
  verticalKey,
  children,
  headlessId,
}: SearchExperienceProps) => {
  return (
    <SearchHeadlessProvider
      {...searchConfig}
      verticalKey={verticalKey}
      headlessId={headlessId}
    >
      <StateManager>{children}</StateManager>
    </SearchHeadlessProvider>
  );
};

const StateManager = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SearchExperience;

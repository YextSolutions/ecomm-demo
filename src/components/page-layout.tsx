import * as React from "react";
import Site from "../types/Site";
import Header from "./header";
import SearchExperience from "./search/SearchExperience";

type Props = {
  _site: Site;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchExperience verticalKey="beverages">
    <div className="min-h-screen font-primary">
      <Header _site={_site} />
    </div>
    </SearchExperience>
  );
};

export default PageLayout;

import * as React from "react";
import Header from "./header";
import SearchExperience from "./search/SearchExperience";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <SearchExperience verticalKey="beverages">
      <div className="min-h-screen font-primary">
        <Header />
        <div className="centered-container pt-28 pb-16 md:pb-0">{children}</div>
      </div>
    </SearchExperience>
  );
};

export default PageLayout;

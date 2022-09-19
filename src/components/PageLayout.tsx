import * as React from "react";
import Header from "./header";
import LocationsProvider from "./providers/LocationsProvider";
import SearchExperience from "./search/SearchExperience";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <SearchExperience verticalKey="beverages">
      <LocationsProvider>
        <div className="min-h-screen font-primary">
          <Header />
          <div className="centered-container pt-28">{children}</div>
        </div>
      </LocationsProvider>
    </SearchExperience>
  );
};

export default PageLayout;

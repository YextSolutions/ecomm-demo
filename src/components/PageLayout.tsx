import * as React from "react";
import Header from "./Header";
import LocationsProvider from "./providers/LocationsProvider";
import SearchExperience from "./search/SearchExperience";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  header?: boolean;
  containerCss?: string;
};

const PageLayout = ({ children, header = true, containerCss }: Props) => {
  return (
    <SearchExperience verticalKey="beverages">
      <LocationsProvider>
        <div className="min-h-screen font-primary">
          {header && <Header />}
          <div
            className={twMerge(
              "mx-auto max-w-screen-xl px-5 pt-28 md:px-14",
              containerCss
            )}
          >
            {children}
          </div>
        </div>
      </LocationsProvider>
    </SearchExperience>
  );
};

export default PageLayout;

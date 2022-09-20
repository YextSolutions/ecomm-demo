import * as React from "react";
import Header from "./header";
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
          {/* div that uses twMerge to combine containerCss with default style */}
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

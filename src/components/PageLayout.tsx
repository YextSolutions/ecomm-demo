import * as React from "react";
import SearchExperience from "./search/SearchExperience";
import { twMerge } from "tailwind-merge";
import Header from "./header";
import AppProvider from "./providers/AppProvider";

type Props = {
  children?: React.ReactNode;
  header?: boolean;
  containerCss?: string;
};

const PageLayout = ({ children, header = true, containerCss }: Props) => {
  return (
    <SearchExperience verticalKey="beverages">
      <AppProvider>
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
      </AppProvider>
    </SearchExperience>
  );
};

export default PageLayout;

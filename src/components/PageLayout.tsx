import * as React from "react";
import SearchExperience from "./search/SearchExperience";
import { twMerge } from "tailwind-merge";
// import Header from "./header";
import Header from "./TwHeader";
import AppProvider from "./providers/AppProvider";
import { SearchActions, State } from "@yext/search-headless-react";

type Props = {
  children?: React.ReactNode;
  header?: boolean;
  containerCss?: string;
  verticalKey?: string;
  hideLocationPicker?: boolean;
  onLoad?: (state: State, actions: SearchActions) => void;
};

const PageLayout = ({
  children,
  header = true,
  containerCss,
  verticalKey,
  hideLocationPicker,
  onLoad,
}: Props) => {
  return (
    <SearchExperience verticalKey={verticalKey} onLoad={onLoad}>
      <AppProvider>
        <div className="min-h-screen font-primary">
          {header && <Header hideLocationPicker={hideLocationPicker} />}
          <div
            className={twMerge(
              "mx-auto max-w-screen-xl px-5 md:px-14" +
                // `${hideLocationPicker ? " pt-16" : ""}`,
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

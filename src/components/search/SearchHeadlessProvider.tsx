import React, { useEffect } from "react";
import { cloneDeep } from "lodash";
import {
  Matcher,
  SearchActions,
  SearchHeadless,
  SearchHeadlessProvider,
  State,
} from "@yext/search-headless-react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";

export interface HeadlessProviderProps {
  searcher: SearchHeadless;
  onLoad?: (state: State, actions: SearchActions) => void;
  onSearch?: (state: State, actions: SearchActions) => void;
  routing?: {
    serializeState: (state: State) => URLSearchParams | undefined;
    deserializeParams: (
      params: URLSearchParams,
      actions: SearchActions,
      state: State
    ) => void;
    updateCadence: "onStateChange" | "onSearch";
  };
  children: React.ReactNode;
}

type InternalRouterProps = Omit<HeadlessProviderProps, "searcher">;

// This is a separate component so that you can useContext()
const InternalRouter = ({
  routing,
  onSearch,
  onLoad,
  children,
}: InternalRouterProps): JSX.Element => {
  const searchActions = useSearchActions();
  const searchState = useSearchState((s) => s);

  // Run whatever code is in the onLoad prop
  useEffect(() => {
    console.log("useEffect - onLoad");
    if (onLoad) {
      onLoad(searchState, searchActions);
    }
  }, []);

  // Fetch the URL params when the page loads, but not after that
  useEffect(() => {
    console.log("useEffect - routing");
    if (routing) {
      const { deserializeParams } = routing;
      const params = new URLSearchParams(window.location.search);

      searchActions.setStaticFilters([
        {
          selected: true,
          filter: {
            fieldId: "c_beverageCategories.name",
            value: "American Whiskey",
            matcher: Matcher.Equals,
            kind: "fieldValue",
          },
        },
      ]);

      deserializeParams(params, searchActions, searchState);
    }
  }, []);

  // Only do anything if the updateCadence is set to onSearch
  // Otherwise, the logic is handled in the SearchHeadlessProvider via overriding search method
  useEffect(() => {
    if (routing && routing.updateCadence === "onStateChange") {
      const { serializeState } = routing;
      searchActions.addListener({
        valueAccessor: (s) => s,
        callback: (state) => {
          if (serializeState) {
            const params = serializeState(state);
            window.history.pushState(
              {},
              "",
              `${params && `?${params.toString()}`}}`
            );
          }
        },
      });
    }
  }, []);

  return <>{children}</>;
};

const HeadlessProvider = ({
  searcher,
  routing,
  onSearch,
  onLoad,
  children,
}: HeadlessProviderProps): JSX.Element => {
  const newSearcher = cloneDeep(searcher);

  if (routing && routing.updateCadence === "onSearch") {
    const { serializeState } = routing;
    newSearcher.executeVerticalQuery = async () => {
      const params = serializeState(searcher.state);
      window.history.pushState(
        {},
        "",
        `${params ? `?${params.toString()}` : ""}`
      );
      return searcher.executeVerticalQuery();
    };
  }

  if (onSearch) {
    newSearcher.executeVerticalQuery = async () => {
      const result = await searcher.executeVerticalQuery();
      onSearch(searcher.state, searcher);
      return result;
    };
  }

  return (
    <SearchHeadlessProvider searcher={newSearcher}>
      <InternalRouter onLoad={onLoad} onSearch={onSearch} routing={routing}>
        {children}
      </InternalRouter>
    </SearchHeadlessProvider>
  );
};

export default HeadlessProvider;

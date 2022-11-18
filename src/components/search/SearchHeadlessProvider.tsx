import React, { useEffect } from "react";
import { cloneDeep } from "lodash";
import {
  SearchActions,
  SearchHeadless,
  SearchHeadlessProvider,
  SelectableStaticFilter,
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
  // this field defines which facets or filters to include in the Search state regardless of the URL
  initialFilters?: SelectableStaticFilter[];
  // this field defines which params from search state to exclude from the URL
  excludedParams?: string[];
  children: React.ReactNode;
}

type InternalRouterProps = Omit<HeadlessProviderProps, "searcher">;

// This is a separate component so that you can useContext()
const InternalRouter = ({
  routing,
  onSearch,
  onLoad,
  children,
  initialFilters,
}: InternalRouterProps): JSX.Element => {
  const searchActions = useSearchActions();
  const searchState = useSearchState((s) => s);

  // Fetch the URL params when the page loads, but not after that
  useEffect(() => {
    if (routing) {
      const { deserializeParams } = routing;
      const params = new URLSearchParams(window.location.search);

      // sets all the relevant search state from the URL params
      deserializeParams(params, searchActions, searchState);

      // if there are any initial filters, set them
      if (initialFilters) {
        searchActions.setStaticFilters(initialFilters);
      }

      searchActions.executeVerticalQuery();
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

  // Run whatever code is in the onLoad prop
  useEffect(() => {
    if (onLoad) {
      onLoad(searchState, searchActions);
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
  initialFilters,
  excludedParams: excludedFieldIds,
}: HeadlessProviderProps): JSX.Element => {
  const newSearcher = cloneDeep(searcher);

  if (routing && routing.updateCadence === "onSearch") {
    const { serializeState } = routing;
    newSearcher.executeVerticalQuery = async () => {
      const params = serializeState(searcher.state);

      // if there are any excluded field ids, remove them from the URL
      if (params && excludedFieldIds) {
        excludedFieldIds.forEach((id) => {
          params.delete(id);
        });
      }

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
      <InternalRouter
        onLoad={onLoad}
        onSearch={onSearch}
        routing={routing}
        initialFilters={initialFilters}
        excludedParams={excludedFieldIds}
      >
        {children}
      </InternalRouter>
    </SearchHeadlessProvider>
  );
};

export default HeadlessProvider;

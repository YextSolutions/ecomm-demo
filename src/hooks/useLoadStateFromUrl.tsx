import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";

export const useLoadStateFromURL = () => {
  const searchActions = useSearchActions();
  const verticalKey = useSearchState((s) => s.vertical.verticalKey);

  const loadSearchParamsFromUrl = () => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    const { query } = params;
    // if (query) {
    searchActions.setQuery(query ?? verticalKey);

    if (verticalKey) {
      searchActions.executeVerticalQuery();
    } else {
      searchActions.executeUniversalQuery();
    }
    // } else {
    //   if (verticalKey) {
    //     searchActions.executeVerticalQuery();
    //   }
    // }
  };

  useEffect(() => {
    if (window) {
      loadSearchParamsFromUrl();
      window.onpopstate = (e) => {
        loadSearchParamsFromUrl();
      };
    }
  }, [verticalKey]);

  return;
};

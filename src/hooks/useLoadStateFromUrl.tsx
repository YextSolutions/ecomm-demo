import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";
import { SelectableFilter } from "@yext/search-headless-react";

export const useSearchPageSetupEffect = (initialFilter?: SelectableFilter) => {
  const searchActions = useSearchActions();
  const verticalKey = useSearchState((s) => s.vertical.verticalKey);

  const loadSearchParamsFromUrl = () => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );

    if (initialFilter) {
      searchActions.setStaticFilters([initialFilter]);
    } else {
      const { query } = params;
      searchActions.setQuery(query);
    }

    if (verticalKey) {
      searchActions.executeVerticalQuery();
    }
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

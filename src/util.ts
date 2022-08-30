// TODO: modify to account for facets and filters
export const setPathAndQueryParams = (
  name: string,
  value: any,
  path?: string
) => {
  const queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.set("query", value);
  // OR do a push to history
  history.pushState(null, path ?? "", "?" + queryParams.toString());
};

export const removeQueryParam = (name: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.delete(name);
  // OR do a push to history
  history.pushState(null, "", "?" + queryParams.toString());
};

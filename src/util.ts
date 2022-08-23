export const setQueryParam = (name: string, value: any) => {
  const queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.set("query", value);
  // OR do a push to history
  history.pushState(null, "", "?" + queryParams.toString());
};

export const removeQueryParam = (name: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.delete(name);
  // OR do a push to history
  history.pushState(null, "", "?" + queryParams.toString());
};

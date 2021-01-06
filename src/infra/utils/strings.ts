export function getQueryString(query: string, param: string) {
  const queryParser = new URLSearchParams(query);
  return queryParser.get(param);
}

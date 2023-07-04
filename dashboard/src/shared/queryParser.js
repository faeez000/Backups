export default class QueryParser {
  static getValueOf(key) {
    const search = window.location.search;
    const urlParams = new URLSearchParams(search);
    return urlParams.get(key);
  }
}

export default class QueryParser {
    /**
     *
     * @param {string} key
     * @returns {string}
     */
    static getValueOf(key) {
        const search = window.location.search;
        const urlParams = new URLSearchParams(search);
        return urlParams.get(key);
    }
}

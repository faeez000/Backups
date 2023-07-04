import Item from "./Item.js";
export default class Section {
    /**
     *
     * @param {string} name
     * @param {string} alias
     * @param {string} redirectURL
     * @param {number} totalElementItems
     */
    constructor(
        name,
        alias,
        /** -1 means there is no limit */
        totalElementItems = -1,
        redirectURL = ""
    ) {
        /**
         * @type {string}
         */
        this.name = name;
        this.alias = alias;
        /**
         * @private
         */
        this.totalElementItems = totalElementItems;
        this.redirectURL = redirectURL;
    }
    getTotalElementItems() {
        return this.totalElementItems;
    }
}

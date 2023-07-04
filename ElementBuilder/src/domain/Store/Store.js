import Item from "../core/ValueObject/Item.js";

export default class Store {
    constructor() {
        /**
         * @type {Item[]}
         */
        this.items = [];
    }
    /**
     *
     * @param {Item[]} items
     */
    register(items) {
        items.forEach((item) => {
            this.items.push(item);
        });
    }
    getItems() {
        return this.items;
    }
    /**
     *
     * @param {string} name
     */
    itemExist(name) {
        const index = this.items.findIndex((item) => (item.name = name));
        return index > -1 ? true : false;
    }
    /**
     * @param {string} name
     * @returns {Item}
     */
    getItemByName(name) {
        var result = this.items.filter((item) => item.name === name);
        return result ? result[0] : null;
    }
}

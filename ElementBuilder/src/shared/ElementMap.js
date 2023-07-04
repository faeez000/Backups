import Element from "../domain/core/Entity/Element.js";

export default class ElementMap {
    constructor() {
        /**
         * @private
         * @type {Readonly<Map<string,Element>>}
         */
        this.map = new Map();
    }
    /**
     *
     * @returns {Readonly<Map<string,Element>>}
     */
    getAllElementMap() {
        return Object.freeze(this.map);
    }
    /**
     *
     * @param {string} elementId
     * @returns {Element}
     */
    getElementBy(elementId) {
        return this.map.get(elementId);
    }
    /**
     * @param {Element} element
     * @returns {void}
     */
    addElement(element) {
        this.map.set(element.id, element);
    }
    /**
     *
     * @param {string} elementId
     * @returns {boolean}
     */
    hasElement(elementId) {
        return this.map.has(elementId);
    }
}

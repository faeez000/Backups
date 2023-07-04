import PropertyBuilder from "../Builders/PropertyBuilder.js";

/**
 * @abstract An abstract class.
 */
export default class Element {
    /**
     * @param {string} id
     * @param {object} property
     */
    constructor(id, property = null) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.name = this.constructor.name;
        this.elementIndex = 0;
        /**
         * @description referenceId is set on server. But it can't be null so we set 0 as default value
         */
        this.property = { referenceId: 0, section: null };
        this._setInitialProperty();
        Object.assign(this.property, property);
    }
    /**
     * @protected
     * @returns {void}
     */
    _setInitialProperty() {
        throw Error("_setProperty is abstract method");
    }

    /**
     *
     * @param {number} value
     */
    setIndex(value) {
        this.elementIndex = value;
    }
}

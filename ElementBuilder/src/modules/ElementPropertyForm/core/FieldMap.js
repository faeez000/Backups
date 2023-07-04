import FormField from "./FormField.js";

export default class FieldMap {
    constructor() {
        /**
         * @private
         * @type {Map<string,FormField>}
         */
        this.fields = new Map();
    }
    /**
     *
     * @param {string} name
     * @param {FormField} field
     * @returns {void}
     */
    registerField(name, field) {
        this.fields.set(name, field);
    }
    /**
     * @param {string} name
     * @returns {FormField | null}
     */
    getFieldByName(name) {
        return this.fields.get(name);
    }
}

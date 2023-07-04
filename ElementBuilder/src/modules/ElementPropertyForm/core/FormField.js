export default class FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        /**
         * @type {string}
         */
        this.id;
        /**
         * @type {string}
         */
        this.name;
        /**
         * @type {string}
         */
        this.nameAttribute;
        /**
         * @type {any}
         */
        this.value;
        this.alias = alias;
    }
    /**
     *
     * @param {string} id
     * @param {string} name
     * @param {string} nameAttribute
     * @param {any} value
     */
    setProps(id, name, nameAttribute, value) {
        this.id = id;
        this.name = name;
        this.nameAttribute = nameAttribute;
        this.value = value;
    }
    /**
     * @protected
     * @param {HTMLLabelElement} label
     * @param {HTMLElement} field
     * @returns {HTMLElement}
     */
    createWrapperAround(label, field) {
        const wrapper = document.createElement("div");
        wrapper.className = "form-group";

        const left = document.createElement("div");
        left.className = "left";

        left.appendChild(label);

        const right = document.createElement("div");
        right.className = "right flex-row-start-center";

        right.appendChild(field);

        wrapper.appendChild(left);
        wrapper.appendChild(right);

        return wrapper;
    }
    /**
     *
     * @param {string} text
     * @param {string} id
     * @returns {HTMLLabelElement}
     */
    createLabel(text, id) {
        const label = document.createElement("label");
        label.setAttribute("for", id);

        label.innerHTML = `<small><b>${text}</b></small>`;

        return label;
    }

    /**
     * @abstract
     * @returns {HTMLElement}
     */
    create() {
        return document.createElement("div");
    }
}

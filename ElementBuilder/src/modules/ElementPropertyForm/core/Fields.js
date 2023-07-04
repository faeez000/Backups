import FormField from "./FormField.js";
import Prop from "./Prop.js";

export class TextboxFormField extends FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        super(alias);
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const input = document.createElement("input");

        input.type = "text";
        input.value = this.value;
        input.id = this.id;
        input.name = this.nameAttribute;
        input.className = "btn-sm form-control field";

        return this.createWrapperAround(label, input);
    }
}
export class ReadOnlyInputFormField extends FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        super(alias);
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const input = document.createElement("input");

        input.type = "input";
        input.value = this.value;
        input.id = this.id;
        input.name = this.nameAttribute;
        input.className = "btn-sm form-control field";
        input.readOnly = true;
        input.disabled = true;

        return this.createWrapperAround(label, input);
    }
}
export class NumberFormField extends FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        super(alias);
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const input = document.createElement("input");

        input.type = "number";
        input.value = this.value;
        input.id = this.id;
        input.name = this.nameAttribute;
        input.className = "btn-sm form-control field";

        return this.createWrapperAround(label, input);
    }
}
export class TextareaFormField extends FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        super(alias);
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const textarea = document.createElement("textarea");

        textarea.value = this.value;
        textarea.id = this.id;
        textarea.name = this.nameAttribute;
        textarea.className = "form-control field";

        return this.createWrapperAround(label, textarea);
    }
}
export class CheckboxFormField extends FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        super(alias);
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const input = document.createElement("input");

        input.type = "checkbox";
        input.value = this.value;
        input.checked = this.value;
        input.id = this.id;
        input.name = this.nameAttribute;
        input.className = "field";

        return this.createWrapperAround(label, input);
    }
}
export class SelectFormField extends FormField {
    /**
     * @param {string} alias
     * @param {Prop[]} options
     */
    constructor(alias, options) {
        super(alias);
        this.options = options;
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const select = document.createElement("select");

        this.options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.key;
            optionElement.setAttribute("data-type", this.name);

            select.appendChild(optionElement);
        });

        select.value = this.value;
        select.id = this.id;
        select.name = this.nameAttribute;
        select.className = "custom-select field";

        return this.createWrapperAround(label, select);
    }
}

export class ColorPickerFormField extends FormField {
    /**
     *
     * @param {string} alias
     */
    constructor(alias) {
        super(alias);
    }
    /**
     * @public
     */
    create() {
        const label = this.createLabel(this.alias, this.nameAttribute);

        const input = document.createElement("input");

        input.type = "color";
        input.value = this.value;
        input.id = this.id;
        input.name = this.nameAttribute;
        input.className = "colorPicker  field";
        input.style.border = "none"

        return this.createWrapperAround(label, input);
    }
}

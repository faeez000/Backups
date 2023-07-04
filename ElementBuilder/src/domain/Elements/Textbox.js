import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class TextBox extends Element {
    /**
     *
     * @param {string} id
     * @param {object} property
     */
    constructor(id, property = null) {
        super(id, property);
    }

    /**
     *
     * @returns {void}
     */
    _setInitialProperty() {
        const propertyBuilder = new PropertyBuilder(this);

        propertyBuilder.setName("Textbox");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setPrimary(false);
        propertyBuilder.setMandatory(false);
        // propertyBuilder.setMasterForm("none");
        propertyBuilder.setFormula("");
        propertyBuilder.setMobileFormula("");
        propertyBuilder.setOnLoadQuery("");
        propertyBuilder.setOnChangeQuery("");
        propertyBuilder.setAutoSuggestion(false);
        propertyBuilder.setAutoFetch(false);
        propertyBuilder.setIsDataColumn(true);
    }
}

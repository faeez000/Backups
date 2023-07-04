import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class Email extends Element {
    /**
     *
     * @param {string} id
     * @param {object} property
     */
    constructor(id, property = null) {
        super(id, property);
    }

    /**
     * @returns {void}
     */
    _setInitialProperty() {
        const propertyBuilder = new PropertyBuilder(this);

        propertyBuilder.setName("Email");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setPrimary(false);
        propertyBuilder.setMandatory(false);
        propertyBuilder.setFormula("");
        propertyBuilder.setMobileFormula("");
        propertyBuilder.setOnLoadQuery("");
        propertyBuilder.setOnChangeQuery("");
        propertyBuilder.setAutoSuggestion(false);
        propertyBuilder.setAutoFetch(false);
        propertyBuilder.setIsDataColumn(true);
    }
}

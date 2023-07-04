import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class Dropdown extends Element {
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

        propertyBuilder.setName("Dropdown");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setPrimary(false);
        propertyBuilder.setMandatory(false);
        propertyBuilder.setMasterForm("none");
        propertyBuilder.setFormula("");
        propertyBuilder.setMobileFormula("");
        propertyBuilder.setOnLoadQuery("");
        // propertyBuilder.setOnChangeQuery("");
        propertyBuilder.setAutoFetch(false);
        propertyBuilder.setOptionType("custom");
        propertyBuilder.setIsDataColumn(true);
    }
}

import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class DateElement extends Element {
    /**
     *
     * @param {string} id
     * @param {object} property
     */
    constructor(id, property = null) {
        super(id, property);
        this.name = "Date";
    }

    /**
     *
     * @returns {void}
     */
    _setInitialProperty() {
        const propertyBuilder = new PropertyBuilder(this);

        propertyBuilder.setName("Date");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setPrimary(false);
        propertyBuilder.setMandatory(false);
        propertyBuilder.setFormula("");
        propertyBuilder.setMobileFormula("");
        propertyBuilder.setOnLoadQuery("");
        propertyBuilder.setOnChangeQuery("");
        propertyBuilder.setIsDataColumn(true);
    }
}

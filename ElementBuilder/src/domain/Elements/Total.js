import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class Total extends Element {
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

        propertyBuilder.setName("Total");
        propertyBuilder.setPrimary(false);
        propertyBuilder.setMandatory(false);
        propertyBuilder.setFormula("");
        propertyBuilder.setOnChangeQuery("");
        propertyBuilder.setIsDataColumn(true);
    }
}

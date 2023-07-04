import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class Instance extends Element {
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

        propertyBuilder.setName("Instance");
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setMandatory(true);
        propertyBuilder.setInitialNo("1");
        propertyBuilder.setPrefix("");
        propertyBuilder.setSuffix("");
        propertyBuilder.setInstanceType("manual");
        propertyBuilder.setIsDataColumn(true);
    }
}
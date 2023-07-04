import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class ActionButton extends Element {
    /**
     *
     * @param {string} id
     * @param {object} property
     */
    constructor(id, property = null) {
        super(id, property);
    }

    _setInitialProperty() {
        const propertyBuilder = new PropertyBuilder(this);

        propertyBuilder.setName("ActionButton");
        propertyBuilder.setIsDataColumn(false);
        propertyBuilder.setImageUrl(null);
        propertyBuilder.setFillColor(null);
        propertyBuilder.setAction(false);

    }
}

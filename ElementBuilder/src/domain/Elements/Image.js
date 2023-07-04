import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class Image extends Element {
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

        propertyBuilder.setName("Image");
        propertyBuilder.setIsDataColumn(false);
        propertyBuilder.setImageUrl(null);
        propertyBuilder.setImageHeight(null);
        propertyBuilder.setImageBorderColor(null);
        propertyBuilder.setImageBorderSize(null);
        propertyBuilder.setAction(false);
    }
}

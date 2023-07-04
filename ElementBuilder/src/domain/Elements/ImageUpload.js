import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class ImageUpload extends Element {
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

        propertyBuilder.setName("Image Upload");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setMandatory(false);
        propertyBuilder.setAccept("jpg,png,jpeg,svg");
        propertyBuilder.setFileSize(2000);
        propertyBuilder.setIsDataColumn(true);
    }
}

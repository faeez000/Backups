import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class FileUpload extends Element {
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

        propertyBuilder.setName("File Upload");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setLabelRequired(true);
        propertyBuilder.setMandatory(false);
        propertyBuilder.setAccept("*");
        propertyBuilder.setFileSize(2000);
        propertyBuilder.setIsDataColumn(true);
    }
}

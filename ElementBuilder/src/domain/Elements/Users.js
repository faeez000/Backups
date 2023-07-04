import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class Users extends Element {
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

        propertyBuilder.setName("Users");
        propertyBuilder.setHelpText(null);
        propertyBuilder.setProfile("none");
        propertyBuilder.setIsDataColumn(true);

    }
}

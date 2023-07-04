import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class HorizontalCardList extends Element {
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

        propertyBuilder.setName("HorizontalCardList");
        propertyBuilder.setTitleColor(null);
        propertyBuilder.setSubtitleColor(null);
        propertyBuilder.setDataReference("From Tables");
        propertyBuilder.setIsDataColumn(false);
        propertyBuilder.setAction(false);

        
    }
}

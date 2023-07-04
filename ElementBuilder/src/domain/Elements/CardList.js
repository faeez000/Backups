import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class CardList extends Element {
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

        propertyBuilder.setName("CardList");
        propertyBuilder.setTitleColor(null);
        propertyBuilder.setSubtitleColor(null);
        propertyBuilder.setDividerColor(null);
        propertyBuilder.setDescriptionColor(null);
        propertyBuilder.setCardDataReference(false)
        propertyBuilder.setIsDataColumn(false);
        propertyBuilder.setAction(false);

        
    }
}

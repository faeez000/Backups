import PropertyBuilder from "../core/Builders/PropertyBuilder.js";
import Element from "../core/Entity/Element.js";

export default class GridElement extends Element {
    /**
     *
     * @param {string} id
     * @param {object} property
     */

    constructor(id, property = null){
        super(id, property);
    }

    _setInitialProperty(){
        const propertyBuilder = new PropertyBuilder(this);

        propertyBuilder.setName("Grid Element");
        propertyBuilder.setFormData("");
        propertyBuilder.setIsDataColumn(false);
    }
}
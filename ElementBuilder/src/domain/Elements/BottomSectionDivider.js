import PropertyBuilder from '../core/Builders/PropertyBuilder.js';
import Element from '../core/Entity/Element.js';

export default class BottomSectionDivider extends Element{
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

        propertyBuilder.setName('Bottom Section Divider');
        propertyBuilder.setNumberOfColumn('');
        propertyBuilder.setDirection('');
        propertyBuilder.setAlign('');
        propertyBuilder.setIsDataColumn(false);
    }
}
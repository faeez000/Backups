import Element from "../../../domain/core/Entity/Element.js";
import { elementStore } from "../../../domain/Store/index.js";
import { propertyFieldContainer } from "../../../shared/domElements.js";
import FormField from "./FormField.js";
import { fieldMap } from "./index.js";

/**
 *
 * @param {Readonly<Element>} elementDTO
 */
function reconstructElement(elementDTO) {
    /**
     * @description runtime constructor
     * @constructor {Element}
     */
    const Element = elementStore.getItemByName(elementDTO.name).value;

    /**
     * @type {Element}
     */
    // @ts-ignore
    const element = new Element(elementDTO.id);

    element.setIndex(elementDTO.elementIndex);

    return element;
}

/**
 * @description creates form fields according to properties
 * @param {Readonly<Element>} elementDTO
 */
export async function createElementPropertiesForm(elementDTO) {
    propertyFieldContainer.innerHTML = "";

    const element = reconstructElement(elementDTO);

    // @ts-ignore
    for (let [key] of Object.entries(element.property)) {
        try {
            element.property[key] = elementDTO.property[key];
            /**
             * @type {FormField}
             */
            const formField = fieldMap.getFieldByName(key);
            formField.setProps(key, key, key, element.property[key]);

            propertyFieldContainer.appendChild(formField.create());
        } catch {}
    }
}

import Element from "../domain/core/Entity/Element.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class ElementService {
    /**
     * @param {string} baseURL
     */
    constructor(baseURL) {
        /**
         * @readonly
         */
        this.baseURL = baseURL;
        /**
         * @type {Element[]}
         */
        this.elements = [];
    }
    /**
     *
     * @param {Element} element
     * @param {string} formId
     * @param {string} formName
     */
    async saveElement(element, formId, formName) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/element?formId=${formId}&formName=${formName}`,
                element,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.elements.splice(element.elementIndex, 0, element);
                return { success: true, referenceId: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {Element} element
     * @param {string} formId
     * @param {string} formName
     * @param {string} oldElementPropertyName
     */
    async updateElement(element, formId, formName, oldElementPropertyName) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/element?formId=${formId}&formName=${formName}&oldElementPropertyName=${oldElementPropertyName}&elementId=${element.id}`,
                element.property,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this._findAndUpdate(element.id, element.property);
                this._updatePropertyNameInDom(
                    element.id,
                    element.property["name"]
                );
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} formId
     * @param {string} section
     * @returns {Promise<object>}
     */
    async getElementsBy(formId, section) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/elements?formId=${formId}&section=${section}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.elements = data.data;
                return { success: true, elements: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} formId
     */
    async getPrimaryElementsBy(formId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/primary-elements?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, primaryElements: data.data };
            }
            return { success: false };
        } catch (Error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} id
     * @returns {number}
     */
    getElementIndexBy(id) {
        return this._findElementById(id).elementIndex;
    }

    /**
     *
     * @param {string} id
     */
    getElementPropertyNameBy(id) {
        return this._findElementById(id).property["name"];
    }
    /**
     *
     * @param {string} id
     */
    async getElementBy(id) {
        return this._findElementById(id);
    }
    /**
     *
     * @param {string} formId
     * @param {string} formName
     * @param {string} elementPropertyName
     * @param {string} id
     * @param {number} index
     * @param {string} section
     */
    async deleteElementBy(
        formId,
        formName,
        elementPropertyName,
        id,
        index,
        section
    ) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/element?formId=${formId}&formName=${formName}&elementPropertyName=${elementPropertyName}&elementId=${id}&elementIndex=${index}&section=${section}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {number} from
     * @param {number} to
     * @param {string} id
     * @param {string} formId
     * @param {string} section
     */
    async moveElement(from, to, id, formId, section) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/move?formId=${formId}&section=${section}`,
                { id, from, to },
                {
                    withCredentials: true,
                }
            );
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     * @private
     * @param {string} elementId
     * @param {object} property
     */
    _findAndUpdate(elementId, property) {
        const element = this._findElementById(elementId);

        if (!!element) {
            element.property = property;
        }
    }
    /**
     * @private
     * @param {string} id
     * @returns {Element}
     */
    _findElementById(id) {
        const index = this.elements.findIndex((element) => element.id === id);

        if (index < 0) {
            return null;
        }
        return this.elements[index];
    }
    /**
     * @private
     * @param {string} id
     * @param {string} value
     * @returns {void}
     */
    _updatePropertyNameInDom(id, value) {
        document.querySelector(`span[data-element-id="${id}"`).textContent =
            value;
    }
}

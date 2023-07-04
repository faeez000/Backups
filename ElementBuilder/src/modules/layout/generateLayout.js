import Layout from "../../domain/core/ValueObject/Layout.js";
import { layoutStore } from "../../domain/Store/index.js";

/**
 *
 * @param {string} formId
 * @param {string} formType
 */
export function generateLayout(formId, formType) {
    const url = `/element-builder?formId=${formId}&type=${formType}`;

    try {
        /**
         * @type {Layout}
         */
        const layout = layoutStore.getItemByName(formType).value;

        layout.setRedirectURLForAllSection(url);
        return layout.render();
    } catch {}
}

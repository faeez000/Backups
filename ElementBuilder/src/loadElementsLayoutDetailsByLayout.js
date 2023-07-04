import Layout from "./domain/core/ValueObject/Layout.js";
import { layoutStore } from "./domain/Store/index.js";
import { loadElements } from "./modules/elements/loadElements.js";
import { loadLayout } from "./modules/layout/loadLayout.js";
import { currentLayoutName } from "./shared/domElements.js";
import { variables } from "./shared/variables.js";

/**
 * @type {Layout}
 */
const layout = layoutStore.getItemByName(variables.formType).value;

export function loadElementsAndLayoutDetailsByLayout() {
    if (!layout.hasSection(variables.layoutSection)) {
        $(variables.layoutModalId).modal("show");
        loadLayout();
        return;
    }
    currentLayoutName.textContent = layout.getSectionAliasByName(
        variables.layoutSection
    );

    loadElements();
}

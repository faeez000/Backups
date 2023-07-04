import {
    elementStore,
    elementItemsBySectionStore,
} from "../../domain/Store/index.js";
import { elementContainer } from "../../shared/domElements.js";
import { createElementItem } from "./components/createElementItem.js";

/**
 *
 * @param {string} section
 */
export function loadElementItemsBySection(section) {
    elementContainer.innerHTML = "";

    try {
        const elementItems =
            elementItemsBySectionStore.getItemByName(section).value;

        elementItems.forEach((item) => {
            elementContainer.innerHTML += createElementItem(
                item.name,
                item.alias
            );
        });
    } catch {}
}

import { mainMenuItemsContainer } from "../util/elements.js";
import MenuCreation from "../util/MenuCreation.js";

/**
 *
 * @param {HTMLElement} item
 */
export function activeMainMenuItems(item = null) {
    // @ts-ignore
    $("*").removeAttr("data-active");

    if (!!item) {
        item.parentElement.parentElement.setAttribute("data-active", "true");

        return;
    }
    const firstItem = mainMenuItemsContainer.firstElementChild;

    if (!!firstItem) {
        firstItem.setAttribute("data-active", "true");

        MenuCreation.updateMainMenuItem(firstItem.getAttribute("data-id"));
    }
}

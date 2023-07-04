import { subMenuItemService } from "../services/index.js";
import { subMenuItemContainer } from "../util/elements.js";
import { SubMenuItem } from "../domain/MenuModel.js";
import { subMenuItemComponent } from "./components/subMenuItemComponent.js";

/**
 *
 * @param {string} mainMenuItemId
 */
export async function loadSubMenuItems(mainMenuItemId) {
    subMenuItemContainer.innerHTML = `<div class="d-flex justify-content-center loading-spinner-container " style="width:100%;"><div class="loader_spinner"></div></div> `;

    const { success, items } = await subMenuItemService.getSubItemsBy(
        mainMenuItemId
    );
        subMenuItemContainer.innerHTML = "";
    if (!!items && items.length > 0 && success) {
        items.forEach(
            /**
             *
             * @param {SubMenuItem} item
             */
            (item) => {
                subMenuItemContainer.innerHTML += subMenuItemComponent(
                    item.id,
                    item.name
                );
            }
        );
        return;
    }
}

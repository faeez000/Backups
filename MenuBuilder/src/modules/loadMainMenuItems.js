import { mainMenuItemService } from "../services/index.js";
import MenuCreation from "../util/MenuCreation.js";
import { MainMenuItem } from "../domain/MenuModel.js";
import { mainMenuItemsContainer } from "../util/elements.js";
import { activeMainMenuItems } from "./activeMainMenuItem.js";
import { mainMenuItemContainer } from "../shared/elements.js";
import { mainMenuItemComponent } from "./components/mainMenuItemComponent.js";
import { searchMenuBuilderListByName} from "./components/searchbar.js"
import { subMenuSearchBar } from "../shared/elements.js";
export async function loadMainMenuItems() {
    const attribute = "data-id";

    mainMenuItemsContainer.innerHTML = "";

    const { success, items } = await mainMenuItemService.getMainMenuItems();

    if (success && items.length > 0) {
        items.sort(
            /**
             *
             * @param {MainMenuItem} a
             * @param {MainMenuItem} b
             * @returns
             */
            (a, b) => a.index - b.index
        );

        items.forEach(
            /**
             * @param {MainMenuItem} item
             */
            (item) => {
                mainMenuItemContainer.innerHTML += mainMenuItemComponent(
                    item.id,
                    item.name
                );
            }
        );


        const aList = document.querySelectorAll(".main-menu-item-container a");
        
        aList.forEach((a) => {
            a.addEventListener("click", (e) => {
                activeMainMenuItems(a);
                MenuCreation.updateMainMenuItem(
                    e.target.getAttribute(attribute)
                );
                  subMenuSearchBar.value=""
                  subMenuSearchBar.blur()
                  searchMenuBuilderListByName()
            });
        });
    }
}

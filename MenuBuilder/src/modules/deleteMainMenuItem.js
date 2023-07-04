import { mainMenuItemService } from "../services/index.js";
import { deleteMainMenuItemForm } from "../shared/elements.js";
import { mainMenuItemsContainer } from "../util/elements.js";
import { findIndexOfElementFrom } from "../util/helper.js";
import { activeMainMenuItems } from "./activeMainMenuItem.js";
import { loadMainMenuItems } from "./loadMainMenuItems.js";
let itemId;

$("#delete-main-menu-item").on("show.bs.modal", function (e) {
    const el = $(e.relatedTarget)[0];
    itemId = el.getAttribute("data-id");
});

deleteMainMenuItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const element = document.querySelector(`li[data-id="${itemId}"]`);

    const itemIndex = findIndexOfElementFrom(
        mainMenuItemsContainer.children,
        element
    );

    const { success, message } = await mainMenuItemService.deleteItem(
        itemId,
        itemIndex
    );

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        $("#delete-main-menu-item").modal("hide");
        itemId = undefined;
        return;
    }
    await loadMainMenuItems();
    activeMainMenuItems();
    $("#delete-main-menu-item").modal("hide");

    itemId = undefined;
    return;
});

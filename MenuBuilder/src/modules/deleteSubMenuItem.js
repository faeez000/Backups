import { subMenuItemService } from "../services/index.js";
import { deleteSubMenuItemForm } from "../shared/elements.js";
import { subMenuItemContainer } from "../util/elements.js";
import { findIndexOfElementFrom } from "../util/helper.js";
import MenuCreation from "../util/MenuCreation.js";
import { loadSubMenuItems } from "./loadSubMenuItems.js";

let itemId;

$("#delete-sub-menu-item").on("show.bs.modal", function (e) {
    const el = $(e.relatedTarget)[0];
    itemId = el.getAttribute("data-id");
});

deleteSubMenuItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const element = document.querySelector(`li[data-id="${itemId}"]`);

    const itemIndex = findIndexOfElementFrom(
        subMenuItemContainer.children,
        element
    );

    const { success, message } = await subMenuItemService.deleteItem(
        itemId,
        MenuCreation.activeMainMenuItem,
        itemIndex
    );

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        $("#delete-sub-menu-item").modal("hide");
        itemId = undefined;
        return;
    }

    MenuCreation.updateMainMenuItem(MenuCreation.activeMainMenuItem);
    loadSubMenuItems(MenuCreation.activeMainMenuItem);

    $("#delete-sub-menu-item").modal("hide");

    itemId = undefined;
    return;
});

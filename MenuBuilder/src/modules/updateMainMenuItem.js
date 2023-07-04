import { mainMenuItemService } from "../services/index.js";
import {
    updateItemNameInput,
    updateMainMenuItemForm,
} from "../shared/elements.js";
import { loadMainMenuItems } from "./loadMainMenuItems.js";

let itemId = "";
let itemName = "";

$("#update-main-menu-item").on("show.bs.modal", function (e) {
    const invoker = $(e.relatedTarget)[0];
    itemId =
        invoker.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
        );
    itemName = invoker.parentElement.previousElementSibling.textContent;
    updateItemNameInput.value = itemName;
});

updateMainMenuItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const item = {};
    item["id"] = itemId;

    for (const [key, value] of formData.entries(formData)) {
        item[key] = value;
    }
    const { success, message } = await mainMenuItemService.update(
        item["id"],
        item["name"]
    );

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    new SnackBar({
        message,
        status: "success",
        dismissible: true,
        timeout: 5000,
    });

    await loadMainMenuItems();
    $("#update-main-menu-item").modal("hide");
    e.target.reset();
    return;
});

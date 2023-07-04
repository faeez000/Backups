import { MainMenuItem } from "../domain/MenuModel.js";
import { mainMenuItemService } from "../services/index.js";
import { addNewItemForm } from "../shared/elements.js";
import { activeMainMenuItems } from "./activeMainMenuItem.js";
import { loadMainMenuItems } from "./loadMainMenuItems.js";

addNewItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mainMenuItem = new MainMenuItem();

    for (const [key, value] of formData.entries(formData)) {
        if (key === "name") {
            mainMenuItem.name = value.trim();
        }
    }
    const { success, message } = await mainMenuItemService.addNewItem(
        mainMenuItem
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
    activeMainMenuItems();

    $("#add-new-main-menu-item").modal("hide");
    e.target.reset();
    return;
});

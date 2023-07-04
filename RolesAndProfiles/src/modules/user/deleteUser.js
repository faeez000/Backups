import {
    createRightsTbody,
    deleteUserForm,
    editRightForm,
    editRightsTbody,
} from "../../shared/elements.js";
import { loadUserItems } from "./loadUserItems.js";
import RightModel from "../../domain/RightModel.js";
import { rightService, userService } from "../../services/index.js";

let userId, formId, id;
// @ts-ignore
$("#delete-user-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    userId = el.getAttribute("data-id");
    formId = el.getAttribute("data-form");
    id = el.getAttribute("id");

    const { success, userDetails } = await userService.getUserDetailsById(id);
});

deleteUserForm.addEventListener("submit", async (e) => {
    {
        e.preventDefault();

        const { success, message } = await userService.deleteBy(id);

        if (!success) {
            // @ts-ignore
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
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
    }
    // @ts-ignore
    $("#delete-user-modal").modal("hide");
    await loadUserItems();
    // @ts-ignore
    e.target.reset();
    return;
});

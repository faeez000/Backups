import { deleteRightForm } from "../../shared/elements.js";
import { loadRightItems } from "./loadRightsItems.js";
import { loadRightsNames } from "../loadrightsnames.js";
import { rightService } from "../../services/index.js";

let rightId, formId;
// @ts-ignore
$("#delete-right-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    rightId = el.getAttribute("id");
    formId = el.getAttribute("data-form");

    const { success, rightDetails } = await rightService.getRightsDetailsById(
        rightId
    );
});

deleteRightForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { success, message } = await rightService.deleteBy(rightId);
    if (!success) {
        // @ts-ignore
        new SnackBar({
            message: message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    new SnackBar({
        message: message,
        status: "info",
        dismissible: true,
        timeout: 5000,
    });

    // @ts-ignore
    $("#delete-right-modal").modal("hide");
    await loadRightItems();
    await loadRightsNames();

    // @ts-ignore
    e.target.reset();
    return;
});

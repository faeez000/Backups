import { formService } from "../services/index.js";
import { deletePageForm } from "../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";

let formId, formName;

// @ts-ignore
$("#delete-page-modal").on("show.bs.modal", function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];
    formId = el.getAttribute("data-id");
    formName = el.getAttribute("data-name");
});

deletePageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { success, message } = await formService.deleteFormBy(
        formId,
        formName
    );

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });

        // @ts-ignore
        $("#delete-page-modal").modal("hide");
        formId = undefined;
        formName = undefined;
        return;
    }

    // @ts-ignore
    $("#delete-page-modal").modal("hide");

    await loadFormItems();

    formId = undefined;
    formName = undefined;

    return;
});

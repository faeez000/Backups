import { formService } from "../../services/index.js";
import {
    deletePageBtn,
    deletePageForm,
    categorySelectorPageBuilder,
} from "../../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

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

    startButtonLoader(deletePageBtn);

    const { success, message } = await formService.deleteFormBy(
        formId,
        formName
    );

    stopButtonLoader(deletePageBtn, "Delete");

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
    new SnackBar({
        message,
        status: "info",
        dismissible: true,
        timeout: 5000,
    });

    // @ts-ignore
    $("#delete-page-modal").modal("hide");

    await loadFormItems();

    formId = undefined;
    formName = undefined;
    categorySelectorPageBuilder.value = "all";

    return;
});

import { elementService } from "../../services/index.js";
import {
    deleteElementButton,
    deleteElementForm,
    mainContainer,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { findIndexOfElementFrom } from "../../utils/findIndexOfElement.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";
import { loadElements } from "./loadElements.js";

let elementPropertyName = undefined;

// @ts-ignore
$(variables.deleteElementModal).on("show.bs.modal", function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];
    variables.elementId = el.getAttribute("data-id");
    elementPropertyName = elementService.getElementPropertyNameBy(
        variables.elementId
    );
});

deleteElementForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(deleteElementButton);

    const index = findIndexOfElementFrom(
        mainContainer.children,
        document.querySelector(`[data-wrapper-id="${variables.elementId}"]`)
    );

    const { success, message } = await elementService.deleteElementBy(
        variables.formId,
        variables.formName,
        elementPropertyName,
        variables.elementId,
        index,
        variables.layoutSection
    );

    if (!success) {
        stopButtonLoader(deleteElementButton, "Delete");

        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        // @ts-ignore
        $(variables.deleteElementModal).modal("hide");
        variables.elementId = "";
        return;
    }
   
    new SnackBar({
        message,
        status: "success",
        dismissible: true,
        timeout: 5000,
    });

    stopButtonLoader(deleteElementButton, "Delete");

    // @ts-ignore
    $(variables.deleteElementModal).modal("hide");

    await loadElements();

    variables.elementId = "";
    elementPropertyName = undefined;
    return;
});

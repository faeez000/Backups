import FormModel from "../../domain/FormModel.js";
import { formService } from "../../services/index.js";
import {
    createNewPageForm,
    createPageBtn,
    categorySelectorPageBuilder,
} from "../../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

createNewPageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // @ts-ignore
    const formData = new FormData(createNewPageForm);

    // if (!formData.get("form_name")) {
    //     return new SnackBar({
    //         message: "Form name cannot be empty",
    //         status: "error",
    //         dismissible: true,
    //         timeout: 5000,
    //     });
    // }

    // if (isContainsSpectialChar(formData.get("form_name"))) {
    //     return new SnackBar({
    //         message: "sepcial characters not allowed",
    //         status: "info",
    //         dismissible: true,
    //         timeout: 5000,
    //     });
    // }

    startButtonLoader(createPageBtn);

    const form = new FormModel();

    for (var [key, value] of formData.entries()) {
        if (key === "multiple") {
            // @ts-ignore
            Object.assign(form, JSON.parse(value));
        } else {
            // @ts-ignore
            form[key] = value.trim();
        }
    }
    const { success, message } = await formService.createNew(form);

    stopButtonLoader(createPageBtn, "Create");

    if (success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
    }

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    // @ts-ignore
    $("#create-new-page-modal").modal("hide");
    await loadFormItems();

    // @ts-ignore
    e.target.reset();
    categorySelectorPageBuilder.value = "all";
    return;
});

function isContainsSpectialChar(str) {
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return pattern.test(str) ? true : false;
}

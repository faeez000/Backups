import FormModel from "../../domain/FormModel.js";
import { formService } from "../../services/index.js";
import {
    categoryElementOfEditForm,
    editFormNameElement,
    editFormTypeElement,
    editPageBtn,
    editPageForm,
} from "../../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

let formId, formName, categoryName, categoryId;

// @ts-ignore
$("#edit-page-modal").on("show.bs.modal", function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    formId = el.getAttribute("data-id");
    formName = el.getAttribute("data-name");
    categoryName = el.getAttribute("data-category");
    categoryId = el.getAttribute("data-category-id");

    // @ts-ignore
    editFormNameElement.value = formName;

    // @ts-ignore
    categoryElementOfEditForm.value = categoryId;
});

editPageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(editPageBtn);

    // @ts-ignore
    const formData = new FormData(editPageForm);

    const form = new FormModel(formId);

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        form[key] = value.trim();
    }
    const { success, message } = await formService.update(form, formName);

    stopButtonLoader(editPageBtn, "Save");

    if (!success) {
        new SnackBar({
            message,
            status: "danger",
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

    // @ts-ignore
    $("#edit-page-modal").modal("hide");
    // $('#edit-page-modal').modal({
    //     show: false
    //   })
    await loadFormItems();

    // @ts-ignore
    e.target.reset();
    return;
});

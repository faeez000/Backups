import FormModel from "../domain/FormModel.js";
import { formService } from "../services/index.js";
import {
    categoryElementOfEditForm,
    editFormNameElement,
    editFormTypeElement,
    editPageForm,
} from "../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";

let formId, formName, categoryName, categoryId, formType;

// @ts-ignore
$("#edit-page-modal").on("show.bs.modal", function (e) {
    // @ts-ignore

    const el = $(e.relatedTarget)[0];

    formId = el.getAttribute("data-id");
    formName = el.getAttribute("data-name");
    categoryName = el.getAttribute("data-category");
    categoryId = el.getAttribute("data-category-id");
    formType = el.getAttribute("data-type");

    // @ts-ignore
    editFormNameElement.value = formName;

    // @ts-ignore
    editFormTypeElement.value = formType;

    // @ts-ignore
    categoryElementOfEditForm.value = categoryId;
});

editPageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // @ts-ignore
    const formData = new FormData(editPageForm);

    const form = new FormModel(formId);

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        form[key] = value.trim();
    }
    const { success, message } = await formService.update(form, formName);

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
    $("#edit-page-modal").modal("hide");
    await loadFormItems();

    // @ts-ignore
    e.target.reset();
    return;
});

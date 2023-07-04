import FormModel from "../domain/FormModel.js";
import { formService } from "../services/index.js";
import { createNewPageForm } from "../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";

createNewPageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // @ts-ignore
    const formData = new FormData(createNewPageForm);

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
    return;
});

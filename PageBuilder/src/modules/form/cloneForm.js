import CloneFormModel from "../../domain/CloneFormModel.js";
import { formService } from "../../services/index.js";
import { clonePageForm } from "../../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";

clonePageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(clonePageForm);
    const form = new CloneFormModel();

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        form[key] = value.trim();
    }
    if (!form.NewForm) {
        new SnackBar({
            message: "Name must be filled out",
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    const { success, message } = await formService.cloneForm(form);

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
        status: "info",
        dismissible: true,
        timeout: 5000,
    });
    // @ts-ignore
    $("#clone-page-modal").modal("hide");
    await loadFormItems();
    // @ts-ignore
    e.target.reset();
    return;
});

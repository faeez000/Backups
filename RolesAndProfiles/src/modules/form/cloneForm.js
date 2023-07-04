import CloneFormModel from "../../domain/CloneFormModel.js";
import { formService } from "../../services/index.js";
import { clonePageForm } from "../../shared/elements.js";
import { loadFormItems } from "../loadFormItems.js";

clonePageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(clonePageForm);

    const form = new CloneFormModel();

    for (var [key, value] of formData.entries()) {
        form[key] = value.trim();
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
    $("#clone-page-modal").modal("hide");
    await loadFormItems();
    e.target.reset();
    return;
});

import { formService } from "../../services/index.js";
import { exportPageForm, exportPageFormBtn } from "../../shared/elements.js";
import FormModel from "../../domain/FormModel.js";
import { loadFormItems } from "./loadFormItems.js";

exportPageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(exportPageForm);

    const form = new FormModel();

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        form[key] = value.trim();
    }

    const { success, formdata } = await formService.exportForm(form.form_id);

    const data = JSON.stringify(formdata);
    const blob = new Blob([data], { type: "application/json" });
    const download = (path, filename) => {
        const anchor = document.createElement("a");
        anchor.href = path;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    const url = URL.createObjectURL(blob);
    download(url, "export.json");
    if (!success) {
        return;
    }
    // @ts-ignore
    $("#export-form-modal").modal("hide");
    await loadFormItems();
    // @ts-ignore
    e.target.reset();
    return;
});

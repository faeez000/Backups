import ImportFormModel from "../../domain/ImportFormModel.js";
import { formService } from "../../services/index.js";
import { importPageForm, selectFile, content } from "../../shared/elements.js";
import { loadFormItems } from "./loadFormItems.js";

let importedData = null;
let filePath;
selectFile.onchange = async () => {
    let [file] = document.querySelector("input[type=file]").files;

    filePath = file.type;

    if (filePath !== "application/json") {
        // alert("Invalid file type");
        file = {};
        file.name = "";
        return;
    }

    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            importedData = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsText(file);
    }
};

importPageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(importPageForm);

    formData.append("Schema", importedData);

    const form = new ImportFormModel();

    for (var [key, value] of formData.entries()) {
        if (key === "Schema") {
            form[key] = JSON.parse(importedData);
        } else {
            form[key] = value;
        }
        // @ts-ignore
    }

    if (!form.form_name) {
        new SnackBar({
            message: "Name must be filled out",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    if (filePath !== "application/json") {
        new SnackBar({
            message: "Invalid File Type",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    if (!form.Schema) {
        new SnackBar({
            message: "File is not Choosen",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    const { success, message } = await formService.importForm(form);

    if (!success) {
        new SnackBar({
            message,
            status: "error",
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
    $("#import-form-modal").modal("hide");
    await loadFormItems();
    // @ts-ignore
    e.target.reset();
    return;
});

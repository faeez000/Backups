import { imageUploadService } from "../../services/index.js";
//import RoleModel from "../domain/RoleModel.js"; 
import { clearHints, showHints } from "./hint.js";

/**
 *
 * @param {HTMLInputElement} fileInput
 * @param {HTMLInputElement} hiddenInput
 * @param {HTMLLabelElement} fileInputLabel
 */
export function addImageUploader(fileInput, hiddenInput, fileInputLabel) {
    fileInput.addEventListener("change", async () => {
        clearHints();
        const files = fileInput.files;

        if (files.length > 0) {
            const file = files[0];

            if (file.size > 4000000) {
                showHints(["Please upload a picture smaller than 4 MB."]);
                return;
            }

            fileInputLabel.textContent = "Uploading...";

            const formData = new FormData();

            formData.append("file", file);

            const { success, url, message } = await imageUploadService.upload(
                formData
            );

            if (success) {
                clearHints();
                fileInputLabel.textContent = file.name.toLocaleLowerCase();
                hiddenInput.value = url;
                return;
            }
            fileInputLabel.textContent = "Choose File";
            showHints([message]);
            return;
        }
    });
}

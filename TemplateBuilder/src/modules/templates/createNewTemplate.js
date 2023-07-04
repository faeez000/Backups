import Template from "../../domain/Entity/Template.js";
import { templateService } from "../../service/index.js";
import {
    createNewTemplateBtn,
    createNewTemplateForm,
} from "../../shared/elements/templateItemElements.js";
import {
    startButtonLoader,
    stopButtonLoader,
} from "../../shared/utils/ui/loader.js";
import { templateVariables } from "../../shared/variables/templateVariable.js";

createNewTemplateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(createNewTemplateBtn);

    const template = new Template();

    const formData = new FormData(createNewTemplateForm);

    for (let [key, value] of formData.entries()) {
        if (key === "json") {
            Object.assign(template, JSON.parse(value.toString()));
        } else {
            template[key] = value.toString().trim();
        }
    }

    const { success, message } = await templateService.save(template);

    stopButtonLoader(createNewTemplateBtn, "Create");

    // @ts-ignore
    $(templateVariables.createTemplateModalId).modal("hide");

    if (!success) {
        new SnackBar({
            message,
            status: "failure",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    createNewTemplateForm.reset();

    new SnackBar({
        message,
        status: "success",
        dismissible: true,
        timeout: 5000,
    });

    document.dispatchEvent(new Event("TemplateCreated"));
});

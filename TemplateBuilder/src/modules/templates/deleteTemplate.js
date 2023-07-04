import { templateService } from "../../service/index.js";
import {
    startButtonLoader,
    stopButtonLoader,
} from "../../shared/utils/ui/loader.js";
import { templateVariables } from "../../shared/variables/templateVariable.js";
import {
    deleteTemplateBtn,
    deleteTemplateForm,
} from "../../shared/elements/templateItemElements.js";

let templateId;

$(templateVariables.deleteTemplateModalId).on("show.bs.modal", function (e) {
    const el = $(e.relatedTarget)[0];
    templateId = el.getAttribute("data-template-id");
});

deleteTemplateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(deleteTemplateBtn);

    const { success, message } = await templateService.remove(templateId);

    stopButtonLoader(deleteTemplateBtn, "Delete");

    templateId = undefined;

    // @ts-ignore
    $(templateVariables.deleteTemplateModalId).modal("hide");

    if (!success) {
        new SnackBar({
            message,
            status: "failure",
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
    document.dispatchEvent(new Event("TemplateDeleted"));
});

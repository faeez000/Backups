import { templateService } from "../../service/index.js";
import {
    updateTemplateNameForm,
    updateTemplateNameBtn,
    updateTemplateNameInput,
    updateTemplateNameHintContainer,
} from "../../shared/elements/templateItemElements.js";
import { showHints } from "../../shared/utils/ui/hint.js";
import {
    startButtonLoader,
    stopButtonLoader,
} from "../../shared/utils/ui/loader.js";
import { templateVariables } from "../../shared/variables/templateVariable.js";

let templateId;

$(templateVariables.updateTemplateNameModalId).on(
    "show.bs.modal",
    function (e) {
        const el = $(e.relatedTarget)[0];
        templateId = el.getAttribute("data-template-id");

        updateTemplateNameInput.value = el.getAttribute("data-template-name");
    }
);

updateTemplateNameForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const templateName = updateTemplateNameInput.value.trim();

    if (templateName.length < 1) {
        showHints(updateTemplateNameHintContainer, [
            "Template name can't be empty",
        ]);
        return;
    }

    startButtonLoader(updateTemplateNameBtn);

    const { success, message } = await templateService.update(
        templateId,
        templateName
    );

    stopButtonLoader(updateTemplateNameBtn, "Save");

    // @ts-ignore
    $(templateVariables.updateTemplateNameModalId).modal("hide");
    templateId = undefined;

    if (!success) {
        new SnackBar({
            message,
            status: "failure",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    updateTemplateNameForm.reset();
    document.dispatchEvent(new Event("TemplateNameUpdated"));

    new SnackBar({
        message,
        status: "success",
        dismissible: true,
        timeout: 5000,
    });
});

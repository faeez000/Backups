import AutofetchDetail from "../../domain/core/Entity/AutofetchDetail.js";
import { autofetchDetailService } from "../../services/index.js";
import {
    autofetchDetailsForm,
    saveAutofetchDetailButton,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

// @ts-ignore
autofetchDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(saveAutofetchDetailButton);

    // @ts-ignore
    const formData = new FormData(autofetchDetailsForm);

    const autofetchDetail = new AutofetchDetail(
        variables.formId,
        variables.elementId,
        variables.elementName
    );

    // @ts-ignore
    for (const [key, value] of formData.entries(formData)) {
        autofetchDetail[key]= value;
    }

    const { success, message } =
        await autofetchDetailService.saveAutofetchDetail(autofetchDetail);

    if (!success) {
        stopButtonLoader(saveAutofetchDetailButton, "Save");
        return;
    }
    stopButtonLoader(saveAutofetchDetailButton, "Save");

    // @ts-ignore
    $(variables.autofetchDetailModal).modal("hide");
    // @ts-ignore
    e.target.reset();
});

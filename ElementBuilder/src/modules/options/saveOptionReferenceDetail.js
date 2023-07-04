import OptionDetail from "../../domain/core/Entity/OptionDetail.js";
import { optionDetailService } from "../../services/index.js";
import {
    optionReferenceDetailsForm,
    saveReferenceOptionButton,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

// @ts-ignore
optionReferenceDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(saveReferenceOptionButton);
    // @ts-ignore
    const formData = new FormData(optionReferenceDetailsForm);

    const optionDetail = new OptionDetail(
        variables.formId,
        variables.elementId
    );

    // @ts-ignore
    for (const [key, value] of formData.entries(formData)) {
        optionDetail[key] = value;
    }

    const { success } = await optionDetailService.saveOptionDetail(
        optionDetail
    );

    if (!success) {
        stopButtonLoader(saveReferenceOptionButton, "Save");
        return;
    }
    stopButtonLoader(saveReferenceOptionButton, "Save");
    // @ts-ignore
    $(variables.optionReferenceDetailsModal).modal("hide");
    // @ts-ignore
    e.target.reset();
});

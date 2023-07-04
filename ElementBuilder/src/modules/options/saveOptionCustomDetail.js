import OptionDetail from "../../domain/core/Entity/OptionDetail.js";
import { optionDetailService } from "../../services/index.js";
import {
    optionCustomDetailsForm,
    saveCustomOptionButton,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

// @ts-ignore
optionCustomDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(saveCustomOptionButton);

    // @ts-ignore
    const formData = new FormData(optionCustomDetailsForm);

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
        stopButtonLoader(saveCustomOptionButton, "Save");
        return;
    }
    stopButtonLoader(saveCustomOptionButton, "Save");

    // @ts-ignore
    $(variables.optionCustomDetailsModal).modal("hide");
    // @ts-ignore
    e.target.reset();
});

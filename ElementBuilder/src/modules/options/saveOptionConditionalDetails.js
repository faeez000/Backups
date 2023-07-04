import OptionDetail from "../../domain/core/Entity/OptionDetail.js";
import { optionDetailService } from "../../services/index.js";
import {
    condionalReferenceDetailForm,
    saveConditionalOptionReferenceDetailsButton,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


condionalReferenceDetailForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    startButtonLoader(saveConditionalOptionReferenceDetailsButton);

     // @ts-ignore
     const formData = new FormData(condionalReferenceDetailForm);

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
        stopButtonLoader(saveConditionalOptionReferenceDetailsButton, "Save");
        return;
    }

    stopButtonLoader(saveConditionalOptionReferenceDetailsButton, "Save");

    // @ts-ignore
    $(variables.conditionalReferenceDetailsModal).modal("hide");
    // @ts-ignore
    e.target.reset()

})
   

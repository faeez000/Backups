import { optionDetailService } from "../../services/index.js";
import { optionValueElement } from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";

// @ts-ignore
$(variables.optionCustomDetailsModal).on("show.bs.modal", async function (e) {
    const { success, detail } = await optionDetailService.getOptionDetailBy(
        variables.elementId,
        variables.formId
    );

    if (success) {
        // @ts-ignore
        optionValueElement.value = detail.value;
        return;
    }
    // @ts-ignore
    optionValueElement.value = "";
    return;
});

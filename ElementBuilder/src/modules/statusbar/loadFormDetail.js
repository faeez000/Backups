import { formService } from "../../services/index.js";
import { formNameElement, formTypeElement } from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";

/**
 * @returns {Promise<void>}
 */
export async function loadFormDetail() {
    const { formDetail, success } = await formService.getFormDetailBy(
        variables.formId
    );
    if (!success) {
        console.error("form not exist");
        return;
    }
    variables.formName = formDetail["form_name"];
    formNameElement.textContent = formDetail["form_name"];
    formTypeElement.textContent = formDetail["form_type"];
}

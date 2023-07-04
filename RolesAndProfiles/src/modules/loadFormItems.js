import FormModel from "../domain/FormModel.js";
import { formService } from "../services/index.js";
import { cloneFormDropdown, formItemContainer } from "../shared/elements.js";
import { createFormItem } from "./createFormItem.js";
import { createOption } from "./createOption.js";

export async function loadFormItems() {
    formItemContainer.innerHTML = "fetching...";
    const { success, forms } = await formService.getForms();
    if (!success) {
        return;
    }

    formItemContainer.innerHTML = "";
    cloneFormDropdown.innerHTML = "";
    forms.forEach(
        /**
         *
         * @param {FormModel} form
         */
        (form) => {
            const formModel = new FormModel(
                form["form_id"],
                form["form_name"],
                form["form_type"],
                form["category_id"],
                form["category_name"]
            );
            formItemContainer.innerHTML += createFormItem(formModel);
            cloneFormDropdown.appendChild(
                createOption(form["form_id"], form["form_name"])
            );
        }
    );
}

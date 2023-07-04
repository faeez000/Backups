import FormModel from "../../domain/FormModel.js";
import { formService } from "../../services/index.js";
import {
    cloneFormDropdown,
    formItemContainer,
    exportFormDropdown,
    exportPageFormBtn,
} from "../../shared/elements.js";
import { createFormItem } from "./components/createFormItem.js";
import { createOption } from "../shared/createOption.js";

export async function loadFormItems() {
    formItemContainer.innerHTML = ` <div class="d-flex justify-content-center w-75"><div class="loader_spinner"></div></div> `;

    const { success, forms } = await formService.getForms();
    if (!success) {
        return;
    }

    formItemContainer.innerHTML = "";
    cloneFormDropdown.innerHTML = "";
    exportFormDropdown.innerHTML = "";

    const formsArrayToRender = [];

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
            formsArrayToRender.push(createFormItem(formModel));

            cloneFormDropdown.appendChild(
                createOption(form["form_id"], form["form_name"])
            );
            exportFormDropdown.appendChild(
                createOption(form["form_id"], form["form_name"])
            );
        }
    );
    if(exportFormDropdown.length !== 0){
        exportPageFormBtn.disabled = false

    }
    formItemContainer.innerHTML = formsArrayToRender.join("");

}

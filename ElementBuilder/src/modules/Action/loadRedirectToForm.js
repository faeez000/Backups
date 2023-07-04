import {elementActionService,
    formService} from "../../services/index.js";
import {redirectToFormDropdown} from "../../shared/domElements.js"
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";

$(variables.redirectToFormModal).on("show.bs.modal", async function (e) {
    const {forms} = await formService.getSimpleForms();

    const {success, action} = await elementActionService.getElementActionByElementId(variables.elementId);

    redirectToFormDropdown.innerHTML = " " ;

    forms.forEach(
        /**
         *
         * @param {string} table
         */
        (form) => {
            redirectToFormDropdown.innerHTML += createOptions(form["form_name"]);
        }
    );

    if(success){
        redirectToFormDropdown.value = action.redirectToForm;
        return;
    }
    redirectToFormDropdown.value = " ";
    return;


})
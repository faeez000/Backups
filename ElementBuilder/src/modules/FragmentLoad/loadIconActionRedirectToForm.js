import {iconActionRedirectToFormService,
    formService} from "../../services/index.js";
import {iconActionDropdown} from "../../shared/domElements.js";
import {variables} from "../../shared/variables.js";
import {createOptions} from "../shared/components/createOptions.js";

$(variables.iconActionModal).on("show.bs.modal", async function(e) {
    const {forms} = await formService.getSimpleAndMobileForms();

    const {success,action} = await iconActionRedirectToFormService.getIconActionRedirectToForm(variables.elementId);

    iconActionDropdown.innerHTML = " ";

    forms.forEach(

        (form) =>{
            iconActionDropdown.innerHTML += createOptions(form["form_name"]);
        }
    );

    if(success){

        iconActionDropdown.value = action.iconRedirectedForm;
        return
    }
    iconActionDropdown.value = " ";
    return
})
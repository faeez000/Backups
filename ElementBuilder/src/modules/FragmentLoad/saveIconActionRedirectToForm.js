import IconActionRedirectToFormDetails from '../../domain/core/Entity/IconActionRedirectToFormDetails.js'
import {iconActionRedirectToFormService} from '../../services/index.js';
import {iconActionForm, saveiconActionButton } from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


iconActionForm.addEventListener("submit", async function(e){
    e.preventDefault();
    startButtonLoader(saveiconActionButton, );

   const formData = new FormData(iconActionForm );

   const iconActionRedirectToFormDetails = new  IconActionRedirectToFormDetails(
    variables.formId,
    variables.elementId,
    variables.elementName
   )

   for (const [key, value] of formData.entries(formData)) {
    iconActionRedirectToFormDetails[key]= value;
}


const {success, message} = 
await iconActionRedirectToFormService.saveIconActionRedirectToForm(iconActionRedirectToFormDetails);


if (!success) {
    stopButtonLoader(saveiconActionButton,"Save");
    return;
}
stopButtonLoader(saveiconActionButton,"Save");

// @ts-ignore
$(variables.iconActionModal).modal("hide");
// @ts-ignore
e.target.reset();

})
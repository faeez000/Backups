import RedirectToFormDetail from '../../domain/core/Entity/TypeJsonDetail.js'
import {elementActionService} from '../../services/index.js';
import {saveRedirectToFormAction,redirectToFormForm} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


redirectToFormForm.addEventListener("submit", async function(e){
    e.preventDefault();
    startButtonLoader(saveRedirectToFormAction);

   const formData = new FormData(redirectToFormForm );

   const redirectToFormDetail = new  RedirectToFormDetail(
    variables.formId,
    variables.elementId,
    variables.elementName
   )

   for (const [key, value] of formData.entries(formData)) {
    redirectToFormDetail[key]= value;
}

const {success, message} = 
await elementActionService.saveElementAction(redirectToFormDetail);


if (!success) {
    stopButtonLoader(saveRedirectToFormAction, "Save");
    return;
}
stopButtonLoader(saveRedirectToFormAction, "Save");

// @ts-ignore
$(variables.redirectToFormModal).modal("hide");
// @ts-ignore
e.target.reset();

})
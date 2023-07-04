import RedirectToUrlDetail from '../../domain/core/Entity/TypeJsonDetail.js'
import {elementActionService} from '../../services/index.js';
import {saveRedirectToUrlAction,redirectToUrlForm} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


redirectToUrlForm.addEventListener("submit", async function(e){
    e.preventDefault();
    startButtonLoader(saveRedirectToUrlAction);

   const formData = new FormData(redirectToUrlForm );

   const redirectToUrlDetail = new  RedirectToUrlDetail(
    variables.formId,
    variables.elementId,
    variables.elementName
   )

   for (const [key, value] of formData.entries(formData)) {
    redirectToUrlDetail[key]= value;
}

const {success, message} = 
await elementActionService.saveElementAction(redirectToUrlDetail);


if (!success) {
    stopButtonLoader(saveRedirectToUrlAction, "Save");
    return;
}
stopButtonLoader(saveRedirectToUrlAction, "Save");

// @ts-ignore
$(variables.redirectToUrlModal).modal("hide");
// @ts-ignore
e.target.reset();

})
import LoadFragmentDetails from '../../domain/core/Entity/LoadFragmentDetails.js'
import {loadFragmentService} from '../../services/index.js';
import {loadFragmentForm, saveLoadFragmentButton } from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


loadFragmentForm.addEventListener("submit", async function(e){
    e.preventDefault();
    startButtonLoader(saveLoadFragmentButton, );

   const formData = new FormData(loadFragmentForm );

   const loadFragmentDetails = new  LoadFragmentDetails(
    variables.formId,
    variables.elementId,
    variables.elementName
   )

   for (const [key, value] of formData.entries(formData)) {
    loadFragmentDetails[key]= value;
}


const {success, message} = 
await loadFragmentService.saveLoadFragment(loadFragmentDetails);


if (!success) {
    stopButtonLoader(saveLoadFragmentButton,"Save");
    return;
}
stopButtonLoader(saveLoadFragmentButton,"Save");

// @ts-ignore
$(variables.loadFragmentModal).modal("hide");
// @ts-ignore
e.target.reset();

})
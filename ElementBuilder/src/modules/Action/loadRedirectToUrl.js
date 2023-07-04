import {elementActionService} from "../../services/index.js";
import {redirectToUrlTextarea} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";

$(variables.redirectToUrlModal).on('show.bs.modal', async function(e){
    const {success, action} = await  elementActionService.getElementActionByElementId(
        variables.elementId 
    )

    if (success) {
        // @ts-ignore
        redirectToUrlTextarea.value = action.redirectToUrl;
        return;
    }
    // @ts-ignore
    redirectToUrlTextarea.value = "";
    return;
})
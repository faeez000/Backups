import {cardDataReferenceService} from '../../services/index.js';
import {typeJsonTextarea} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";

$(variables.typeJsonModal).on('show.bs.modal', async function(e){
    const {success, detail} = await  cardDataReferenceService.getCardDataReferenceDetailBy(
        variables.elementId,
        variables.formId
    )

    if (success) {
        // @ts-ignore
        typeJsonTextarea.value = detail.json;
        return;
    }
    // @ts-ignore
    typeJsonTextarea.value = "";
    return;
})

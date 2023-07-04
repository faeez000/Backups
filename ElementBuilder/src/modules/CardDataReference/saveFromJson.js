import TypeJsonDetail from '../../domain/core/Entity/TypeJsonDetail.js'
import {cardDataReferenceService} from '../../services/index.js';
import {saveTypeJson,typeJsonForm} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

typeJsonForm.addEventListener("submit",async function(e){
    e.preventDefault();

    startButtonLoader(saveTypeJson);

    const formData = new FormData(typeJsonForm);

    const typeJsonDetails = new TypeJsonDetail(
        variables.formId,
        variables.elementId,
        variables.elementName
    ) 

    for (const [key, value] of formData.entries(formData)) {
        typeJsonDetails[key]= value;
    }

    const {success, message} = 
    await cardDataReferenceService.saveCardDataReferenceDetail(typeJsonDetails);


    if (!success) {
        stopButtonLoader(saveTypeJson, "Save");
        return;
    }
    stopButtonLoader(saveTypeJson, "Save");

    // @ts-ignore
    $(variables.typeJsonModal).modal("hide");
    // @ts-ignore
    e.target.reset();

})

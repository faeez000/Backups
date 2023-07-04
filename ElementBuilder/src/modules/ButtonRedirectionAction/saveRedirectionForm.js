import RedirectToCWDetail from '../../domain/core/Entity/TypeJsonDetail.js'
import {elementActionService} from '../../services/index.js';
import {buttonRedirectionForm, saveRedirectionButton} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


buttonRedirectionForm.addEventListener('submit', async function (e){
    e.preventDefault()

    startButtonLoader(saveRedirectionButton)

    const formData = new FormData(buttonRedirectionForm)

    const redirectToCWDetails = new RedirectToCWDetail(
        variables.formId,
        variables.elementId,
        variables.elementName,
    )

    for (const[key, value] of formData.entries(formData)){
       
        if(key === 'redirectValue' && !value){
           
        }else {
            redirectToCWDetails[key]= value;
            
        }
        
       
    }
   

    const {success,message} = await elementActionService.saveElementAction(redirectToCWDetails);

    if(!success){
        stopButtonLoader(saveRedirectionButton,"Save");
        return
    }
    stopButtonLoader(saveRedirectionButton,'Save');


    //@ts-ignore
    $(variables.redirectionModal).modal('hide');

    //@ts-ignore
    e.target.reset();

})
import {
    optionDetailService,
} from "../../services/index.js";
import {
    sectionElementListDropdown,
    optionsQueryTextArea,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";


// @ts-ignore
$(variables.conditionalReferenceDetailsModal).on("show.bs.modal",async function (e) {

        console.log('hello 1')
        const { success, detail } = await optionDetailService.getOptionDetailBy(
            variables.elementId,
            variables.formId
        );

        
        optionsQueryTextArea.innerHTML = "";
 
            if (success) {
         
                // @ts-ignore
                optionsQueryTextArea.value = detail.query;
                return;
            }
            // @ts-ignore
            optionsQueryTextArea.value = "";
            return;


    });
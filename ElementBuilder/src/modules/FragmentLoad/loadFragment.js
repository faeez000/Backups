import {loadFragmentService,
    formService} from "../../services/index.js";
import {loadFragmentDropdown} from "../../shared/domElements.js";
import {variables} from "../../shared/variables.js";
import {createOptions} from "../shared/components/createOptions.js";

$(variables.loadFragmentModal).on("show.bs.modal", async function(e) {
    const {forms} = await formService.getSimpleAndMobileForms();

    const {success,fragment} = await loadFragmentService.getLoadFragment(variables.elementId);

    loadFragmentDropdown.innerHTML = " ";

    forms.forEach(

        (form) =>{
            loadFragmentDropdown.innerHTML += createOptions(form["form_name"]);
        }
    );

    if(success){

        loadFragmentDropdown.value = fragment.loadFragment;
        return
    }
    loadFragmentDropdown.value = " ";
    return
})
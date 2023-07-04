import {instanceBehaviourService} from '../../services/index.js';
import {instanceBehaviourDropdown} from '../../shared/domElements.js';
import {variables} from '../../shared/variables.js';

$(variables.instanceBehaviourModal).on("show.bs.modal",async function (e) {

    const {success, behaviour} = await instanceBehaviourService.getInstanceBehaviourBy(variables.elementId);

    // instanceBehaviourDropdown.innerHTML = " ";

    if (success){

        instanceBehaviourDropdown.value = behaviour.instanceBehaviour;

        return;
    }
    instanceBehaviourDropdown.value = "Edit and Continue" ; 
    return;
})
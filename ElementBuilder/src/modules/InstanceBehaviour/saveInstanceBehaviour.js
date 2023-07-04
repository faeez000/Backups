import InstanceBehaviourDetails from '../../domain/core/Entity/InstanceBehaviourDetails.js';
import {instanceBehaviourService} from '../../services/index.js';
import {instanceBehaviourForm, saveInstanceBehaviourButton} from '../../shared/domElements.js';
import {variables} from '../../shared/variables.js';
import {stopButtonLoader, startButtonLoader} from '../../utils/ui/loader.js';

instanceBehaviourForm.addEventListener('submit', async function (e){
    e.preventDefault()

    startButtonLoader(saveInstanceBehaviourButton);

    const formData = new FormData(instanceBehaviourForm);

    const instanceBehaviourDetails = new InstanceBehaviourDetails(
        variables.formId,
        variables.elementId,
        variables.elementName,
    )

    for (const[key, value] of formData.entries(formData)){
        instanceBehaviourDetails[key] = value;
    }

    const {success, message} = await instanceBehaviourService.saveInstanceBehaviour(instanceBehaviourDetails);

    if (!success){
        stopButtonLoader(saveInstanceBehaviourButton,"Save");
        return;
    }
        stopButtonLoader(saveInstanceBehaviourButton,"Save");
    

    $(variables.instanceBehaviourModal).modal("hide");

    e.target.reset();
})

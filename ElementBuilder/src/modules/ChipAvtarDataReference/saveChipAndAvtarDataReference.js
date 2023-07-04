import ChipAndAvtarDataReferenceDetail from "../../domain/core/Entity/Chip_AvtarDataReferenceDetail.js";
import {chipAndAvtarDataReferenceService} from '../../services/index.js';
import {saveChipAndAvtarDataReferenceButton,chipAndAvtarDataReferenceForm} from '../../shared/domElements.js';
import {variables} from '../../shared/variables.js';
import { startButtonLoader, stopButtonLoader } from '../../utils/ui/loader.js'

chipAndAvtarDataReferenceForm.addEventListener("submit", async(e)=>{
    e.preventDefault();

    startButtonLoader(saveChipAndAvtarDataReferenceButton);

    const formData = new FormData(chipAndAvtarDataReferenceForm);

    const chipAndAvtarDetails = new ChipAndAvtarDataReferenceDetail(
        variables.formId,
        variables.elementId,
        variables.elementName
    )
       
    for (const [key,value] of formData.entries(formData)){
        chipAndAvtarDetails[key]=value;
    }

    const {success , message} =
        await chipAndAvtarDataReferenceService.saveChipAndAvtarDataReferenceDetail(chipAndAvtarDetails);

        if (!success){
            stopButtonLoader(saveChipAndAvtarDataReferenceButton,"Save");
            return;
        }
        stopButtonLoader(saveChipAndAvtarDataReferenceButton,"Save");

        $(variables.chipAndAvtarDataReferenceModal).modal("hide");

        e.target.reset();
  
})
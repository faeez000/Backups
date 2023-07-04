import DataReferenceDetail from "../../domain/core/Entity/CardDataReferenceDetail.js";
import { dataReferenceService} from "../../services/index.js";
import {savedataReferenceButton, dataReferenceDetailsForm} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


dataReferenceDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(savedataReferenceButton);

    const formData = new FormData(dataReferenceDetailsForm);

    const dataReferenceDetail = new DataReferenceDetail(
        variables.formId,
        variables.elementId,
        variables.elementName
    );

     // @ts-ignore
     for (const [key, value] of formData.entries(formData)) {
        dataReferenceDetail[key]= value;
    }

    const { success, message } =
    await dataReferenceService.saveDataReferenceDetail(dataReferenceDetail);

    if (!success) {
        stopButtonLoader(savedataReferenceButton, "Save");
        return;
    }
    stopButtonLoader(savedataReferenceButton, "Save");

    // @ts-ignore
    $(variables.dataReferenceModal).modal("hide");
    // @ts-ignore
    e.target.reset();

});

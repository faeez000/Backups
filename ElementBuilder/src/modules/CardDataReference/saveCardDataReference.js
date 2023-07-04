import CardDataReferenceDetail from "../../domain/core/Entity/CardDataReferenceDetail.js";
import { cardDataReferenceService} from "../../services/index.js";
import {saveCardDataReferenceButton, cardDataReferenceDetailsForm} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";


cardDataReferenceDetailsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(saveCardDataReferenceButton);

    const formData = new FormData(cardDataReferenceDetailsForm);

    const cardDataReferenceDetail = new CardDataReferenceDetail(
        variables.formId,
        variables.elementId,
        variables.elementName
    );

     // @ts-ignore
     for (const [key, value] of formData.entries(formData)) {
        cardDataReferenceDetail[key]= value;
    }

    const { success, message } =
    await cardDataReferenceService.saveCardDataReferenceDetail(cardDataReferenceDetail);

    if (!success) {
        stopButtonLoader(saveCardDataReferenceButton, "Save");
        return;
    }
    stopButtonLoader(saveCardDataReferenceButton, "Save");

    // @ts-ignore
    $(variables.cardDataReferenceModal).modal("hide");
    // @ts-ignore
    e.target.reset();

});
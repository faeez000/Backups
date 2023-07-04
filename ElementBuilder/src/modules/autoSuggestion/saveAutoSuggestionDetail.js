import AutoSuggestionDetail from "../../domain/core/Entity/AutoSuggestionDetail.js";
import {
    autofetchDetailService,
    autoSuggestionDetailService,
} from "../../services/index.js";
import {
    autoSuggestionForm,
    saveAutoSuggestionButton,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

// @ts-ignore
autoSuggestionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(saveAutoSuggestionButton);
    // @ts-ignore
    const formData = new FormData(autoSuggestionForm);

    const autoSuggestionDetail = new AutoSuggestionDetail(
        variables.formId,
        variables.elementId
    );

    // @ts-ignore
    for (const [key, value] of formData.entries(formData)) {
        autoSuggestionDetail[key] = value;
    }

    const { success } =
        await autoSuggestionDetailService.saveAutoSuggestionDetail(
            autoSuggestionDetail
        );

    if (!success) {
        stopButtonLoader(saveAutoSuggestionButton, "Save");
        return;
    }
    stopButtonLoader(saveAutoSuggestionButton, "Save");
    // @ts-ignore
    $(variables.autoSuggestionModal).modal("hide");
    // @ts-ignore
    e.target.reset();
});

import { templateService } from "../../service/index.js";
import { templateItemsContainer } from "../../shared/elements/templateItemElements.js";
import { templateCardComponent } from "./components/templateCardComponent.js";

export async function loadTemplates() {
    templateItemsContainer.innerHTML = "fetching...";

    const { success, templates } = await templateService.getTemplates();

    if (!success) {
        templateItemsContainer.innerHTML = "Not Found !";
        return;
    }
    if (success && templates.length < 1) {
        templateItemsContainer.innerHTML = "Not Found !";
        return;
    }

    templateItemsContainer.innerHTML = "";

    for (let template of templates) {
        templateItemsContainer.innerHTML += templateCardComponent(template);
    }
}

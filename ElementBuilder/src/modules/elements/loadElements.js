import { elementService } from "../../services/index.js";
import { mainContainer } from "../../shared/domElements.js";
import { createElement } from "./components/createElement.js";
import { variables } from "../../shared/variables.js";

export async function loadElements() {
    mainContainer.innerHTML = "Fetching...";

    const { success, elements } = await elementService.getElementsBy(
        variables.formId,
        variables.layoutSection
    );

    mainContainer.innerHTML = "";

    if (success) {
        elements.forEach((element) => {
            mainContainer.innerHTML += createElement(element);
        });
    }
}

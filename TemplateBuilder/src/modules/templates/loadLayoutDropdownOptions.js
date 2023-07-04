import { templateService } from "../../service/index.js";
import { templateLayoutDropdown } from "../../shared/elements/templateItemElements.js";
import { createOption } from "../../shared/utils/createOption.js";

export async function loadLayoutDropdownOptions() {
    const { success, layouts } = await templateService.getTemplateLayouts();

    if (!success) {
        return;
    }

    for (let layout of layouts) {
        templateLayoutDropdown.innerHTML += createOption(
            layout["template_name"],
            layout["template_id"]
        );
    }
}

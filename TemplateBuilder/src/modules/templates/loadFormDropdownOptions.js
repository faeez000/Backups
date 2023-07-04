import { templateService } from "../../service/index.js";
import { formDropdown } from "../../shared/elements/templateItemElements.js";
import { createOption } from "../../shared/utils/createOption.js";

export async function loadFormDropdownOptions() {
    const { success, formList } = await templateService.getFormList();

    if (!success) {
        return;
    }

    for (let formItem of formList) {
        formDropdown.innerHTML += createOption(
            formItem["form_name"],
            JSON.stringify(formItem)
        );
    }
}

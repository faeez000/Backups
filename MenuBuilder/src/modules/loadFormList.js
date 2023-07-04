import { formListService } from "../services/index.js";
import { formListContainer } from "../shared/elements.js";
import { formItemComponent } from "./components/formItemComponent.js";

export async function loadFormList() {
    const { success, forms } = await formListService.getFormList();
    const formList = [];

    if (success) {
        forms.forEach((item) => {
            formList.push(
                formItemComponent(
                    item["form_id"],
                    item["form_name"],
                    item["form_type"]
                )
            );
        });
        formListContainer.innerHTML = formList.join("");
    }
}

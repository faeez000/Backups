import CategoryModel from "../domain/CategoryModel.js";
import { categoryService } from "../services/index.js";
import {
    categoryElementOfCreateForm,
    categoryElementOfEditForm,
} from "../shared/elements.js";
import { createOption } from "./createOption.js";

export async function loadCategory() {
    const { success, categories } = await categoryService.getCategories();

    if (!success) {
        return;
    }
    categoryElementOfCreateForm.innerHTML = "";
    categoryElementOfEditForm.innerHTML = "";

    categories.forEach(
        /**
         * @param {CategoryModel} category
         */
        (category) => {
            categoryElementOfCreateForm.appendChild(
                createOption(category["category_id"], category["category_name"])
            );
            categoryElementOfEditForm.appendChild(
                createOption(category["category_id"], category["category_name"])
            );
        }
    );
}

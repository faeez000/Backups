import CategoryModel from "../../domain/CategoryModel.js";
import { categoryService } from "../../services/index.js";
import {
    categoryElementOfCreateForm,
    categoryElementOfEditForm,
    categoryElementOfCloneForm,
    categoryElementOfImportForm,
    categorySelectorPageBuilder,
} from "../../shared/elements.js";
import { createOption } from "../shared/createOption.js";

export async function loadCategory() {
    const { success, categories } = await categoryService.getCategories();

    if (!success) {
        return;
    }

    categoryElementOfCreateForm.innerHTML = "";
    categoryElementOfEditForm.innerHTML = "";
    categoryElementOfImportForm.innerHTML = "";
    categoryElementOfCloneForm.innerHTML = "";
    categorySelectorPageBuilder.innerHTML = "";

    const defaultOption = createOption("all", "All");
    defaultOption.setAttribute("selected", true);

    categorySelectorPageBuilder.appendChild(defaultOption);

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
            categoryElementOfCloneForm.appendChild(
                createOption(category["category_id"], category["category_name"])
            );
            categoryElementOfImportForm.appendChild(
                createOption(category["category_id"], category["category_name"])
            );
            categorySelectorPageBuilder.appendChild(
                createOption(category["category_id"], category["category_name"])
            );
        }
    );
}

import CategoryModel from "../../domain/CategoryModel.js";
import { categoryService } from "../../services/index.js";
import { categoryItemContainer } from "../../shared/elements.js";
import { createCategoryItem } from "../createCategoryItem.js";

export async function loadCategoryItem() {
    categoryItemContainer.innerHTML = "fetching...";
    const { success, categories } = await categoryService.getCategories();
    if (!success) {
        return;
    }
    categoryItemContainer.innerHTML = "";
    categories.forEach(
        /**
         *
         * @param {CategoryModel} category
         */
        (category) => {
            const categoryModel = new CategoryModel(
                category["category_id"],
                category["category_name"]
            );
            categoryItemContainer.innerHTML += createCategoryItem(
                categoryModel
            );
        }
    );
}

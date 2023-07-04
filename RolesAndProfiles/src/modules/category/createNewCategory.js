import CategoryModel from "../../domain/CategoryModel.js";
import { categoryService } from "../../services/index.js";
import { createNewCategoryForm } from "../../shared/elements.js";
import { loadCategory } from "../loadCategory.js";
import { loadCategoryItem } from "./loadCategoryItems.js";

createNewCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createNewCategoryForm);

    const category = new CategoryModel();

    for (var [key, value] of formData.entries()) {
        category[key] = value.trim();
    }
    const { success, message } = await categoryService.create(category);

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    $("#create-new-category-modal").modal("hide");
    await loadCategoryItem();
    await loadCategory();
    e.target.reset();
    return;
});

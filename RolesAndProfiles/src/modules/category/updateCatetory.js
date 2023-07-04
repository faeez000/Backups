import CategoryModel from "../../domain/CategoryModel.js";
import { categoryService } from "../../services/index.js";
import { editCategoryForm, editCategoryName } from "../../shared/elements.js";
import { loadCategory } from "../loadCategory.js";
import { loadCategoryItem } from "./loadCategoryItems.js";

let categoryId, categoryName;

$("#edit-category-modal").on("show.bs.modal", function (e) {
    const el = $(e.relatedTarget)[0];

    categoryId = el.getAttribute("data-id");
    categoryName = el.getAttribute("data-name");

    editCategoryName.value = categoryName;
});

editCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(editCategoryForm);

    const category = new CategoryModel(categoryId);

    for (var [key, value] of formData.entries()) {
        category[key] = value.trim();
    }
    const { success, message } = await categoryService.update(category);

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    $("#edit-category-modal").modal("hide");
    await loadCategoryItem();
    await loadCategory();
    e.target.reset();
    return;
});

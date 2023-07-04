import CategoryModel from "../../domain/CategoryModel.js";
import { categoryService } from "../../services/index.js";
import {
    editCategoryeBtn,
    editCategoryForm,
    editCategoryName,
} from "../../shared/elements.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";
import { loadCategory } from "./loadCategory.js";
import { loadCategoryItem } from "./loadCategoryItems.js";

let categoryId, categoryName;

// @ts-ignore
$("#edit-category-modal").on("show.bs.modal", function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    categoryId = el.getAttribute("data-id");
    categoryName = el.getAttribute("data-name");

    editCategoryName.value = categoryName;
});

editCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(editCategoryeBtn);

    const formData = new FormData(editCategoryForm);

    const category = new CategoryModel(categoryId);

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        category[key] = value.trim();
    }
    const { success, message } = await categoryService.update(category);

    stopButtonLoader(editCategoryeBtn, "Save");

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    // @ts-ignore
    $("#edit-category-modal").modal("hide");
    await loadCategoryItem();
    await loadCategory();
    // @ts-ignore
    e.target.reset();
    return;
});

import CategoryModel from "../../domain/CategoryModel.js";
import { categoryService } from "../../services/index.js";
import {
    createCategoryBtn,
    createNewCategoryForm,
} from "../../shared/elements.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";
import { loadCategory } from "./loadCategory.js";
import { loadCategoryItem } from "./loadCategoryItems.js";

createNewCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(createCategoryBtn);

    const formData = new FormData(createNewCategoryForm);

    const category = new CategoryModel();

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        category[key] = value.trim();
    }
    const { success, message } = await categoryService.create(category);

    stopButtonLoader(createCategoryBtn, "Create");

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
    $("#create-new-category-modal").modal("hide");
    await loadCategoryItem();
    await loadCategory();
    // @ts-ignore
    e.target.reset();
    return;
});

import { categoryService } from "../../services/index.js";
import { deleteCategory, deleteCategoryBtn } from "../../shared/elements.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";
import { loadCategory } from "./loadCategory.js";
import { loadCategoryItem } from "./loadCategoryItems.js";

let categoryId;

$("#delete-category-modal").on("show.bs.modal", function (e) {
    const el = $(e.relatedTarget)[0];
    categoryId = el.getAttribute("data-id");
});

deleteCategory.addEventListener("submit", async (e) => {
    e.preventDefault();

    startButtonLoader(deleteCategoryBtn);

    const { success, message } = await categoryService.deleteBy(categoryId);

    stopButtonLoader(deleteCategoryBtn, "Delete");

    if (!success) {
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        $("#delete-category-modal").modal("hide");
        categoryId = undefined;
        return;
    }
    $("#delete-category-modal").modal("hide");

    await loadCategoryItem();
    await loadCategory();

    categoryId = undefined;
    return;
});

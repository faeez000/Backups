import { pageListService } from "../services/index.js";
import { pageListContainer } from "../shared/elements.js";
import { pageItemComponent } from "./components/pageItemComponent.js";

export async function loadPageList() {
    const { success, pages } = await pageListService.getPageList();
    const pageList = [];

    if (success) {
        pages.forEach((item) => {
            pageList.push(pageItemComponent(item["id"], item["name"]));
        });
        pageListContainer.innerHTML = pageList.join("");
    }
}

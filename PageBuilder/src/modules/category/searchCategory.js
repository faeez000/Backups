import { searchCategoryInput } from "../../shared/elements.js";

searchCategoryInput.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchCategoryBy(e.target.value);
});

function searchCategoryBy(name) {
    const cards = document.querySelectorAll("#category-item");
    const lowerCaseName = name.toLowerCase();

    cards.forEach(
        /**
         *
         * @param {HTMLElement} card
         */
        (card) => {
            const cardTitle = card.getAttribute("data-name").toLowerCase();
            if (cardTitle.indexOf(lowerCaseName) > -1) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    );
}

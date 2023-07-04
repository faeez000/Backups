import { categorySelectorPageBuilder, search } from "../../shared/elements.js";

categorySelectorPageBuilder.onchange = function (e) {
    const selectedValue = e.target.value;
    filterFormsByCategory(selectedValue);
};

function filterFormsByCategory(categoryId) {
    const cards = document.querySelectorAll("#page-item");
    search.value = "";

    cards.forEach(
        /**
         *
         * @param {HTMLElement} card
         */
        (card) => {
            const cardCategoryId = card.getAttribute("data-category-id");
            if (categoryId === "all") {
                card.style.display = "block";
            } else if (cardCategoryId === categoryId) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    );
}

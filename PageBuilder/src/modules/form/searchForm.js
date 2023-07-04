import { categorySelectorPageBuilder, search } from "../../shared/elements.js";

search.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchFormBy(e.target.value);
});

function searchFormBy(name) {
    const cards = document.querySelectorAll("#page-item");
    const lowerCaseName = name.toLowerCase();
    categorySelectorPageBuilder.value = "all";

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

import {searchOrganizationInput} from "../shared/elements.js";

searchOrganizationInput.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchOrganizationBy(e.target.value);
});

function searchOrganizationBy(name) {
    const organizationCards = document.querySelectorAll("#Organization");
    const lowerCaseName = name.toLowerCase();

    organizationCards.forEach(
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

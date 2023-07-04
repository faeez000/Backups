import {  searchTemplateInput } from "../../../shared/elements/templateItemElements.js";

searchTemplateInput.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchTemplateBy(e.target.value);
    
});

function searchTemplateBy(name) {
    const TemplateCards = document.querySelectorAll("#Template");
    
    const lowerCaseName = name.toLowerCase();

    TemplateCards.forEach(
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

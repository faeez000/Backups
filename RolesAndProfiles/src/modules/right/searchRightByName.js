import {  searchRightsInput } from "../../shared/elements.js";

searchRightsInput.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchRightsBy(e.target.value);
    
});

function searchRightsBy(name) {
    const rightCards = document.querySelectorAll("#Right");
   
    const lowerCaseName = name.toLowerCase();

    rightCards.forEach(
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

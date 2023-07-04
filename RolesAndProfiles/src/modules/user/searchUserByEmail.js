import {  searchUserInput } from "../../shared/elements.js";

searchUserInput.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchUserBy(e.target.value);
    
});

function searchUserBy(name) {
    const userCards = document.querySelectorAll("#User");
   
    const lowerCaseName = name.toLowerCase();

    userCards.forEach(
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

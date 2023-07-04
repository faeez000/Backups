import {  searchProfileInput } from "../../shared/elements.js";

searchProfileInput.addEventListener("keyup", (e) => {
    // @ts-ignore
    searchProfileBy(e.target.value);
    
});

function searchProfileBy(name) {
    const profileCards = document.querySelectorAll("#Profile");
   
    const lowerCaseName = name.toLowerCase();

    profileCards.forEach(
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

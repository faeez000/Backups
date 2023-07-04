import { roleHintContainer } from "../elements.js";

/**
 *
 * @param {string[]} hints
 */
export function showHints(hints) {
    clearHints();
    hints.forEach((hint) => {
        const p = document.createElement("p");
        p.className = "mb-1";
        p.textContent = hint;
        p.style.color = "orange";
        p.style.fontSize = "normal";
        p.style.fontWeight = "normal";
        roleHintContainer.appendChild(p);
    });
}

export function clearHints() {
    roleHintContainer.innerHTML = "";
}

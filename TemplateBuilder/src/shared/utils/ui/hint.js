/**
 *
 * @param {HTMLDivElement} container
 * @param {string[]} hints
 */
export function showHints(container, hints) {
    clearHints(container);

    hints.forEach((hint) => {
        const p = document.createElement("p");
        p.textContent = hint;
        p.style.color = "orange";
        p.style.fontSize = "normal";
        p.style.fontWeight = "normal";
        p.style.marginBottom = "4px !important";
        container.appendChild(p);
    });
    setTimeout(() => {
        clearHints(container);
    }, 3000);
}

/**
 * @param {HTMLDivElement} container
 */
export function clearHints(container) {
    container.innerHTML = "";
}

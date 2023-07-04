/**
 *
 * @param {HTMLDivElement} hintContainer
 * @param {string[]} hints
 */

export function showHints(hintContainer, hints) {
    hintContainer.innerHTML = "";
    hints.forEach((hint) => {
        hintContainer.appendChild(createHint(hint));
    });
}
/**
 *
 * @param {HTMLDivElement} hintContainer
 */
export function clearHints(hintContainer) {
    hintContainer.innerHTML = "";
}

/**
 *
 * @param {string} text
 */
function createHint(text) {
    const container = document.createElement("div");
    const p = document.createElement("p");

    container.className =
        "mb-4 p-2 flex-column-start-start border-dashed-warning";
    container.innerHTML = "<small><b>Hints</b><small>";

    p.className = "m-0 mb-2";
    p.textContent = `${text}`;

    container.appendChild(p);

    return container;
}

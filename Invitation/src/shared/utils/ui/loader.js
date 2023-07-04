/**
 *
 * @param {HTMLButtonElement} button
 */
export function startButtonLoader(button) {
    button.disabled = true;
    button.innerHTML = `<div class="spinner-border spinner-border-sm" style="width: 1.3rem; height: 1.3rem;" role="status"></div>`;
}
/**
 *
 * @param {HTMLButtonElement} button
 * @param {string} text
 */
export function stopButtonLoader(button, text) {
    button.disabled = false;
    button.innerHTML = text;
}

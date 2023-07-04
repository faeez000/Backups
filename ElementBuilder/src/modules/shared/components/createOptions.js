/**
 *
 * @param {string} value
 * @param {string} text
 * @returns
 */
export function createOptions(value, text = value) {
    return `<option value="${value}">${text}</option>`;
}

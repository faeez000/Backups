/**
 *
 * @param {HTMLCollection} elements
 * @param {HTMLElement} element
 * @returns
 */
export function findIndexOfElementFrom(elements, element) {
    return [...elements].indexOf(element);
}

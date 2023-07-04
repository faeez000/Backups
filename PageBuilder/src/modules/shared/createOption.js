/**
 * @param {string} id
 * @param {string} name
 * @returns {HTMLOptionElement}
 */
export function createOption(id, name) {
    const option = document.createElement("option");

    option.setAttribute("value", id);
    option.textContent = name;

    return option;
}

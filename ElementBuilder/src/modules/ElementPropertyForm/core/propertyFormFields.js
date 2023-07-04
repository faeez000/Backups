/**
 *
 * @param {HTMLLabelElement} label
 * @param {HTMLElement} formField
 * @returns {HTMLElement}
 */
function createWrapperAround(label, formField) {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const left = document.createElement("div");
    left.className = "left";

    left.appendChild(label);

    const right = document.createElement("div");
    right.className = "right";

    right.appendChild(formField);

    wrapper.appendChild(left);
    wrapper.appendChild(right);

    return wrapper;
}
/**
 *
 * @param {string} text
 * @param {string} id
 */
function createLabel(text, id) {
    const label = document.createElement("label");
    label.setAttribute("for", id);

    label.innerHTML = `<small><b>${text}</b></small>`;

    return label;
}

/**
 *
 * @param {string} filedLabel
 * @param {string} nameAttribute
 * @param {string} value
 * @returns {HTMLElement}
 */
export function createTextboxFormField(filedLabel, nameAttribute, value) {
    const label = createLabel(filedLabel, nameAttribute);

    const input = document.createElement("input");

    input.type = "text";
    input.value = value.toString();
    input.id = nameAttribute;
    input.name = nameAttribute;
    input.className = "btn-sm form-control";

    return createWrapperAround(label, input);
}

/**
 *
 * @param {string} filedLabel
 * @param {string} nameAttribute
 * @param {string} value
 * @returns {HTMLElement}
 */
export function createTextareaFormField(filedLabel, nameAttribute, value) {
    const label = createLabel(filedLabel, nameAttribute);

    const textarea = document.createElement("textarea");

    textarea.value = value;
    textarea.id = nameAttribute;
    textarea.name = nameAttribute;
    textarea.className = "form-control";

    return createWrapperAround(label, textarea);
}

/**
 *
 * @param {string} filedLabel
 * @param {string} nameAttribute
 * @param {boolean} value
 * @returns {HTMLElement}
 */
export function createCheckboxFormField(filedLabel, nameAttribute, value) {
    const label = createLabel(filedLabel, nameAttribute);

    const input = document.createElement("input");

    input.type = "checkbox";
    input.checked = value;
    input.id = nameAttribute;
    input.name = nameAttribute;
    input.className = "form-control";

    return createWrapperAround(label, input);
}

/**
 *
 * @param {string} filedLabel
 * @param {string} nameAttribute
 * @param {string[]} options
 * @param {string} value
 * @returns {HTMLElement}
 */
export function createDropdownFormField(
    filedLabel,
    nameAttribute,
    options,
    value
) {
    const label = createLabel(filedLabel, nameAttribute);

    const select = document.createElement("select");

    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;

        select.appendChild(optionElement);
    });

    select.value = value;
    select.id = nameAttribute;
    select.name = nameAttribute;
    select.className = "custom-select";

    return createWrapperAround(label, select);
}

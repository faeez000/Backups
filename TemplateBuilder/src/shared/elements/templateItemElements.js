/**
 * @type {HTMLDivElement}
 */
const templateItemsContainer = document.querySelector("#template-items");
/**
 * @type {HTMLFormElement}
 */
const createNewTemplateForm = document.querySelector(
    "#create-new-template-form"
);
/**
 * @type {HTMLSelectElement}
 */
const templateLayoutDropdown = document.querySelector("#layout-dropdown");

/**
 * @type {HTMLSelectElement}
 */
const searchTemplateInput = document.querySelector("#Template-serach-input");

/**
 * @type {HTMLSelectElement}
 */
const formDropdown = document.querySelector("#form-dropdown");
/**
 * @type {HTMLButtonElement}
 */
const createNewTemplateBtn = document.querySelector("#create-template-btn");

/**
 * @type {HTMLFormElement}
 */
const updateTemplateNameForm = document.querySelector(
    "#update-template-name-form"
);
/**
 * @type {HTMLButtonElement}
 */
const updateTemplateNameBtn = document.querySelector(
    "#update-template-name-btn"
);
/**
 * @type {HTMLInputElement}
 */
const updateTemplateNameInput = document.querySelector(
    "#update-template-name-input"
);
/**
 * @type {HTMLButtonElement}
 */
const deleteTemplateBtn = document.querySelector("#delete-template-btn");
/**
 * @type {HTMLFormElement}
 */
const deleteTemplateForm = document.querySelector("#delete-template-form");

const updateTemplateNameHintContainer = document.querySelector(
    "#update-template-name-form-hint-container"
);

export {
    templateItemsContainer,
    createNewTemplateForm,
    templateLayoutDropdown,
    formDropdown,
    createNewTemplateBtn,
    updateTemplateNameForm,
    updateTemplateNameBtn,
    updateTemplateNameInput,
    deleteTemplateBtn,
    deleteTemplateForm,
    updateTemplateNameHintContainer,
    searchTemplateInput,
};

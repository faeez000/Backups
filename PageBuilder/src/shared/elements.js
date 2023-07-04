const formItemContainer = document.querySelector(".form-item-container");
const categoryItemContainer = document.querySelector(".category-container");
const categoryElementOfCreateForm = document.querySelector("#category");
const categoryElementOfImportForm = document.querySelector("#import-category");
const categoryElementOfCloneForm = document.querySelector("#clone-category");
const categoryElementOfEditForm = document.querySelector("#select-category");

/**
 * @type {HTMLFormElement}
 */
const createNewPageForm = document.querySelector("#create-new-page");
/**
 * @type {HTMLFormElement}
 */
const editPageForm = document.querySelector("#edit-page");
/**
 * @type {HTMLFormElement}
 */
const createNewCategoryForm = document.querySelector("#create-new-category");


/**
 * @type {HTMLFormElement}
 */
 const actionAndQueryForm = document.querySelector("#Action-And-Query-form");

 const actionDropdown = document.querySelector("#action");
 const queryTextarea = document.querySelector("#query");
 const nameTextbox = document.querySelector('#name')

 /**
 * @type {HTMLFormElement}
 */
  const updateactionAndQueryForm = document.querySelector("#Action-And-Query-Update-form");

  const updateactionDropdown = document.querySelector("#Update-action");
  const updatequeryTextarea = document.querySelector("#Update-Query");
  const updateNameTextbox = document.querySelector('#Update-Name');

/**
 * @type {HTMLFormElement}
 */
const editCategoryForm = document.querySelector("#edit-category-form");
const search = document.querySelector("#search");
const deletePageForm = document.querySelector("#delete-page");
const editFormTypeElement = document.querySelector("#edit-form-type");
const editFormNameElement = document.querySelector("#edit-form-name");
/**
 * @type {HTMLInputElement}
 */
const editCategoryName = document.querySelector("#edit-category-name");
const deleteCategory = document.querySelector("#delete-category");
const deletePageMessage = document.querySelector("#delete-page-message");
const deleteCategoryMessage = document.querySelector(
    "#delete-category-message"
);
const exportFormDropdown = document.querySelector("#export-form-id");

const cloneFormDropdown = document.querySelector("#clone-form-id");
/**
 * @type {HTMLFormElement}
 */
const clonePageForm = document.querySelector("#clone-page");

const exportPageForm = document.querySelector("#export-form");
const exportPageFormBtn = document.querySelector("#export-form-btn");

const importPageForm = document.querySelector("#import-form");
const importPageFormBtn = document.querySelector("#import-form-btn");
const selectFile = document.querySelector("#import-select-file");
const content = document.querySelector(".content");
/**
 * @type {HTMLDivElement}
 */
const formLayoutModalBody = document.querySelector("#form-layout");

/**
 * @type {HTMLButtonElement}
 */
const createPageBtn = document.querySelector("#create-page-btn");

/**
 * @type {HTMLButtonElement}
 */
const editPageBtn = document.querySelector("#edit-page-btn");

/**
 * @type {HTMLButtonElement}
 */
const deletePageBtn = document.querySelector("#delete-page-btn");

/**
 * @type {HTMLButtonElement}
 */
const createCategoryBtn = document.querySelector("#create-category-btn");

/**
 * @type {HTMLButtonElement}
 */
const editCategoryeBtn = document.querySelector("#edit-category-btn");

/**
 * @type {HTMLButtonElement}
 */
const deleteCategoryBtn = document.querySelector("#delete-category-btn");

/**
 * @type {HTMLButtonElement}
 */
const searchCategoryInput = document.querySelector("#search-category");

/**
 * @type {HTMLButtonElement}
 */
const categorySelectorPageBuilder = document.querySelector(
    "#filter-by-category"
);

/**
 * @type {HTMLButtonElement}
 */
 const saveActionAndQueryBtn = document.querySelector(
    "#add-Action-And-Query-btn"
);

/**
 * @type {HTMLButtonElement}
 */
 const updateActionAndQueryBtn = document.querySelector(
    "#update-Action-And-Query-btn"
);


export {
    formItemContainer,
    categoryItemContainer,
    categoryElementOfCreateForm,
    categoryElementOfEditForm,
    createNewPageForm,
    editPageForm,
    clonePageForm,
    createNewCategoryForm,
    editFormTypeElement,
    editCategoryName,
    editFormNameElement,
    editCategoryForm,
    deletePageForm,
    deleteCategory,
    cloneFormDropdown,
    search,
    deleteCategoryMessage,
    deletePageMessage,
    formLayoutModalBody,
    createPageBtn,
    editPageBtn,
    deletePageBtn,
    createCategoryBtn,
    editCategoryeBtn,
    deleteCategoryBtn,
    exportPageForm,
    exportFormDropdown,
    exportPageFormBtn,
    importPageForm,
    importPageFormBtn,
    categoryElementOfCloneForm,
    categoryElementOfImportForm,
    selectFile,
    content,
    searchCategoryInput,
    categorySelectorPageBuilder,
    actionAndQueryForm,
    actionDropdown,
    queryTextarea,
    nameTextbox,
    saveActionAndQueryBtn,
    updateActionAndQueryBtn,
    updateactionAndQueryForm,
    updateactionDropdown,
    updatequeryTextarea,
    updateNameTextbox,
};

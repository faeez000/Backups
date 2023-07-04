const mainMenuItemContainer = document.querySelector(
    ".main-menu-item-container"
);
const subMenuItemContainer = document.querySelector(".sub-menu-item-container");
const formListContainer = document.querySelector(".form-list-item-container");
const pageListContainer = document.querySelector(".page-list-item-container");
const ledgerListContainer = document.querySelector(
    ".ledger-list-item-container"
);
const addNewItemForm = document.querySelector("#add-new-item");
const deleteSubMenuItemForm = document.querySelector("#delete-sub-item");
const deleteMainMenuItemForm = document.querySelector("#delete-item");
const updateMainMenuItemForm = document.querySelector("#update-item");
const updateItemNameInput = document.querySelector("#update-item-name");


const mainMenuSearchBar = document.getElementById("mainMenuSearchBar");
const subMenuSearchBar = document.getElementById("subMenuSearchBar");
const formSearchBar = document.getElementById("formsSearchBar");
const ledgerSearchBar = document.getElementById("ledgersSearchBar");
const pageSearchBar = document.getElementById("pagesSearchBar");

const mainMenuSearchBarClearBtn =document.getElementById("main-menu-searchbar-clear")
const formSearchBarClearBtn =document.getElementById("form-searchbar-clear")
const ledgerSearchBarClearBtn =document.getElementById("ledger-searchbar-clear")
const pageSearchBarClearBtn =document.getElementById("page-searchbar-clear")
const subMenuSearchBarClearBtn = document.getElementById("sub-menu-searchbar-clear")
export {
    mainMenuItemContainer,
    subMenuItemContainer,
    formListContainer,
    pageListContainer,
    ledgerListContainer,
    addNewItemForm,
    deleteSubMenuItemForm,
    deleteMainMenuItemForm,
    updateMainMenuItemForm,
    updateItemNameInput,
    mainMenuSearchBar,
    subMenuSearchBar,
    formSearchBar,
    ledgerSearchBar,
    pageSearchBar,
    subMenuSearchBarClearBtn,
    formSearchBarClearBtn,
    pageSearchBarClearBtn,
    ledgerSearchBarClearBtn,
    mainMenuSearchBarClearBtn
};

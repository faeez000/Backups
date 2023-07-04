import {
    mainMenuSearchBar,
    subMenuSearchBar,
    pageSearchBar,
    formSearchBar,
    ledgerSearchBar,
    subMenuSearchBarClearBtn,
    formSearchBarClearBtn,
    pageSearchBarClearBtn,
    ledgerSearchBarClearBtn,
    mainMenuSearchBarClearBtn
} from "../../shared/elements.js";



export function searchMenuBuilderListByName(menuBuilderListItem="", itemsArray="subMenuSearchBar") {
    const menuBuilderCards = document.querySelectorAll(`.${itemsArray}`);
    const menuBuilderListItemLowerCaseName =
        menuBuilderListItem.toLowerCase().trim();

    menuBuilderCards.forEach((menuBuilderCard) => {
        const cardTitle = menuBuilderCard
            .getAttribute("data-name")
            .toLowerCase();

        if (cardTitle.indexOf(menuBuilderListItemLowerCaseName) > -1) {
            menuBuilderCard.style.display = "block";
        } else {
            menuBuilderCard.style.display = "none";
        }
    });
}


let i = 1
export default function menuBuilderSearchBarFunction(searchbar, itemsArray) {

    searchbar.addEventListener("keyup", (e) => {
        searchMenuBuilderListByName(e.target.value, itemsArray);
    });

}



function clearSearchField(inputField ,clearBtn, itemArray ){   
    clearBtn?.addEventListener("click",()=>{
        inputField.value =""
        searchMenuBuilderListByName( " ", itemArray)
    })
    
}

clearSearchField(subMenuSearchBar, subMenuSearchBarClearBtn, "subMenuSearchBar")
clearSearchField(formSearchBar, formSearchBarClearBtn, "formSearchBar")
clearSearchField(mainMenuSearchBar ,mainMenuSearchBarClearBtn, "mainMenuSearch")
clearSearchField(ledgerSearchBar, ledgerSearchBarClearBtn, "ledgerSearchBar")
clearSearchField(pageSearchBar, pageSearchBarClearBtn, "pageSearchBar")

menuBuilderSearchBarFunction(mainMenuSearchBar, "mainMenuSearch");
menuBuilderSearchBarFunction(subMenuSearchBar, "subMenuSearchBar");
menuBuilderSearchBarFunction(formSearchBar, "formSearchBar");
menuBuilderSearchBarFunction(pageSearchBar, "pageSearchBar");
menuBuilderSearchBarFunction(ledgerSearchBar, "ledgerSearchBar");


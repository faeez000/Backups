import { SubMenuItem } from "./domain/MenuModel.js";
import { mainMenuItemService, subMenuItemService } from "./services/index.js";
import { findIndexOfElementFrom } from "./util/helper.js";
// import MenuCreation from "./util/MenuCreation.js";
import { loadFormList } from "./modules/loadFormList.js";
import { loadPageList } from "./modules/loadPageList.js";
import { loadLedgerList } from "./modules/loadLedgerList.js";
import { loadMainMenuItems } from "./modules/loadMainMenuItems.js";
import MenuCreation from "./util/MenuCreation.js";
import { activeMainMenuItems } from "./modules/activeMainMenuItem.js";

import { AXIOS_INSTANCE } from "./Global.js";
import { loadAccountDetails } from "./navbar/loadAccountDetails.js";
import { checkIsAdmin } from "./modules/checkIsAdmin/checkIsAdmin.js";

import  "./modules/components/searchbar.js"
import { subMenuSearchBar } from "./shared/elements.js";
var config = {
    apiKey: "AIzaSyDleysoc_2w1EJQqFPRHUskebDD6h3FYbQ",
    authDomain: "cleverlywork.firebaseapp.com",
    databaseURL: "https://cleverlywork-default-rtdb.firebaseio.com",
    projectId: "cleverlywork",
};

// @ts-ignore
firebase.initializeApp(config);

// make auth and firestore references
// @ts-ignore
const auth = firebase.auth();
// @ts-ignore

const signOutButton = document.getElementById("signOut");

signOutButton.addEventListener("click", async () => {
    firebase.auth().signOut();
});

auth.onAuthStateChanged(async (user) => {
    if (user) {
        AXIOS_INSTANCE.defaults.headers.common["Authorization"] = user.uid;

        document.body.style.display = "block";

        const mainMenuItemsContainer = document.querySelector(
            ".main-menu-item-container"
        );
        const subMenuItemContainer = document.querySelector(
            ".sub-menu-item-container"
        );
        const formListMenuItemsContainer = document.querySelector(
            ".form-list-item-container"
        );
        const pageListMenuItemsContainer = document.querySelector(
            ".page-list-item-container"
        );
        const ledgerListMenuItemsContainer = document.querySelector(
            ".ledger-list-item-container"
        );

        import("./navbar/navbar-script.js");
        import("./modules/addNewMainMenuItem.js");
        import("./modules/updateMainMenuItem.js");
        import("./modules/deleteMainMenuItem.js");
        import("./modules/deleteSubMenuItem.js");

        (async () => {
            await loadAccountDetails();
            await loadMainMenuItems();
            await checkIsAdmin();

            if (mainMenuItemsContainer.children.length > 0) {
                MenuCreation.updateMainMenuItem(
                    mainMenuItemsContainer.children[0].getAttribute("data-id")
                );
            }
            activeMainMenuItems();
            await loadFormList();
            await loadPageList();
            await loadLedgerList();

        })();

        let mainMenuItemDragFromIndex = 0,
            mainMenuItemDropToIndex = 0,
            subMenuItemDragFromIndex = 0,
            subMenuItemDropToIndex = 0;

        dragula([mainMenuItemsContainer])
            .on("drag", function (el, source) {
                if (source === mainMenuItemsContainer) {
                    mainMenuItemDragFromIndex = findIndexOfElementFrom(
                        source.children,
                        el
                    );
                }
            })
            .on("drop", async function (el, target, source) {
                if (source === target) {
                    const id = el.getAttribute("data-id");
                    mainMenuItemDropToIndex = findIndexOfElementFrom(
                        source.children,
                        el
                    );
                    const { success } = await mainMenuItemService.moveItem(
                        mainMenuItemDragFromIndex,
                        mainMenuItemDropToIndex,
                        id
                    );
                    if (!success) {
                        new SnackBar({
                            message: "failed to move",
                            status: "info",
                            dismissible: true,
                            timeout: 5000,
                        });
                    }
                    mainMenuItemDragFromIndex = 0;
                    mainMenuItemDropToIndex = 0;
                }
            });

        const drake = dragula(
            [formListMenuItemsContainer, subMenuItemContainer],
            {
                copy: function (el, source) {
                    return source === formListMenuItemsContainer;
                },
                accepts: function (el, target) {
                    return target !== formListMenuItemsContainer;
                },
                slideFactorX: 10,
                slideFactorY: 0,
            }
        )
            .on("drag", async function (el, source) {
                if (source === subMenuItemContainer) {
                    subMenuItemDragFromIndex = findIndexOfElementFrom(
                        source.children,
                        el
                    );
                }
            })
            .on("drop", async function (el, target, source) {
                if (
                    target === subMenuItemContainer &&
                    source === formListMenuItemsContainer
                ) {
                    const itemIndex = findIndexOfElementFrom(
                        target.children,
                        el
                    );
                    const itemName = el.getAttribute("data-name");
                    const formId = el.getAttribute("data-id");
                    const itemSubtype = el.getAttribute("item-Subtype");
                    const mainMenuItemId = MenuCreation.activeMainMenuItem;

                    const subMenuItem = new SubMenuItem(
                        formId,
                        "form",
                        itemSubtype,
                        mainMenuItemId,
                        itemIndex,
                        itemName
                    );

                    const { success, message } =
                        await subMenuItemService.addNewItem(subMenuItem);

            //         /**
            //  * 
            //  * <li class="flex-row" data-id="${id}"> ==> el
            //     <div class="flex-row-between-center"> ==> children[0]
            //         <div class="name">${name}</div> 
            //         <div class="actions w-10"> ==> children[1]
            //         <div class="delete mr-1" data-toggle="modal" data-target="#delete-sub-menu-item" data-id="#id" data-name="#name"> ==> children[0]
            //          <svg></svg>
            //         </div>
            //      </div>
            //     </div>
            //  </li>
            //  */

                    if (!success) {
                        new SnackBar({
                            message,
                            status: "info",
                            dismissible: true,
                            timeout: 5000,
                        });
                        el.parentElement.removeChild(el);

                        return;
                    }
                    el.setAttribute("data-id", subMenuItem.id);
                el.setAttribute("class", "subMenuSearchBar");
                    
                    el.children[0].children[1].children[0].setAttribute(
                        "data-id",
                        subMenuItem.id
                    );
                }
                if (
                    source === subMenuItemContainer &&
                    target === subMenuItemContainer
                ) {
                    subMenuItemDropToIndex = findIndexOfElementFrom(
                        source.children,
                        el
                    );
                    const itemId = el.getAttribute("data-id");
                    const { success } = await subMenuItemService.moveItem(
                        subMenuItemDragFromIndex,
                        subMenuItemDropToIndex,
                        itemId,
                        MenuCreation.activeMainMenuItem
                    );

                    if (!success) {
                        new SnackBar({
                            message: "failed to move",
                            status: "info",
                            dismissible: true,
                            timeout: 5000,
                        });
                    }
                    subMenuItemDragFromIndex = 0;
                    subMenuItemDropToIndex = 0;
                }
            });

        // pageList

        dragula([pageListMenuItemsContainer, subMenuItemContainer], {
            copy: function (el, source) {
                return source === pageListMenuItemsContainer;
            },
            accepts: function (el, target) {
                return target !== pageListMenuItemsContainer;
            },
            slideFactorX: 10,
            slideFactorY: 0,
        }).on("drop", async function (el, target, source) {
            if (
                target === subMenuItemContainer &&
                source === pageListMenuItemsContainer
            ) {
                const itemIndex = findIndexOfElementFrom(target.children, el);
                const itemName = el.getAttribute("data-name");
                const pageId = el.getAttribute("data-id");
                const mainMenuItemId = MenuCreation.activeMainMenuItem;

                const subMenuItem = new SubMenuItem(
                    pageId,
                    "page",
                    null,
                    mainMenuItemId,
                    itemIndex,
                    itemName
                );

                const { success, message } =
                        await subMenuItemService.addNewItem(subMenuItem);

                if (!success) {
                    new SnackBar({
                        message,
                        status: "info",
                        dismissible: true,
                        timeout: 5000,
                    });

                    el.parentElement.removeChild(el);

                    return;
                }

                el.setAttribute("data-id", subMenuItem.id);
                el.setAttribute("class", "subMenuSearchBar");

                el.children[0].children[1].children[0].setAttribute(
                    "data-id",
                    subMenuItem.id
                );
            }
        });

        // pagelist end

        //ledgerList start

        dragula([ledgerListMenuItemsContainer, subMenuItemContainer], {
            copy: function (el, source) {
                return source === ledgerListMenuItemsContainer;
            },
            accepts: function (el, target) {
                return target !== ledgerListMenuItemsContainer;
            },
            slideFactorX: 10,
            slideFactorY: 0,
        }).on("drop", async function (el, target, source) {
            if (
                target === subMenuItemContainer &&
                source === ledgerListMenuItemsContainer
            ) {
                const itemIndex = findIndexOfElementFrom(target.children, el);
                const itemName = el.getAttribute("data-name");
                const ledgerId = el.getAttribute("data-id");
                const mainMenuItemId = MenuCreation.activeMainMenuItem;

                const subMenuItem = new SubMenuItem(
                    ledgerId,
                    "ledger",
                    null,
                    mainMenuItemId,
                    itemIndex,
                    itemName
                );

                const { success, message } =
                    await subMenuItemService.addNewItem(subMenuItem);

                    if(success){

                    }
                if (!success) {
                    new SnackBar({
                        message,
                        status: "info",
                        dismissible: true,
                        timeout: 5000,
                    });

                    el.parentElement.removeChild(el);

                    return;
                }

                el.setAttribute("data-id", subMenuItem.id);
                el.setAttribute("class", "subMenuSearchBar");
                
                el.children[0].children[1].children[0].setAttribute(
                    "data-id",
                    subMenuItem.id
                );
            }
        });

        //ledgerList End

        // this helps to auto scroll while dragging
        autoScroll(
            [
                document.querySelector(".menu"),
                document.querySelector(".sub-menu-body"),
                document.querySelector(".main-menu-body"),
            ],
            {
                margin: 30,
                maxSpeed: 10,
                scrollWhenOutside: true,
                autoScroll: function () {
                    return this.down && drake.dragging;
                },
            }
        );
    } else {
        window.location.href = "/signin";
    }
});

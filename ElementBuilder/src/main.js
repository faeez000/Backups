import Element from "./domain/core/Entity/Element.js";
import { loadFormDetail } from "./modules/statusbar/loadFormDetail.js";
import { loadElementsAndLayoutDetailsByLayout } from "./loadElementsLayoutDetailsByLayout.js";

import { elementStore, layoutStore } from "./domain/Store/index.js";
import { elementContainer, mainContainer } from "./shared/domElements.js";
import { elementMap } from "./shared/index.js";
import { loadElementItemsBySection } from "./modules/elementStoreItems/loadElementItems.js";
import { checkIsAdmin } from "./modules/checkIsAdmin/checkIsAdmin.js";
import { elementService } from "./services/index.js";
import {
    createElement,
    createElementContent,
} from "./modules/elements/components/createElement.js";
import { findIndexOfElementFrom } from "./utils/findIndexOfElement.js";
import { variables } from "./shared/variables.js";
import { AXIOS_INSTANCE } from "./Global.js";
import { loadAccountDetails } from "./navbar/loadAccountDetails.js";

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

        import("./modules/ElementPropertyForm/updateProperties.js");
        import("./modules/elements/deleteElement.js");
        import("./modules/autofetch/loadAutofetchDetails.js");
        import("./modules/options/loadOptionCustomDetails.js");
        import("./modules/options/loadOptionReferenceDetails.js");
        import("./modules/autoSuggestion/loadAutoSuggesionDetail.js");

        import("./modules/ElementPropertyForm/loadColumnOnTableChange.js");
        import("./modules/autofetch/saveAutofetchDetail.js");
        import("./modules/options/saveOptionCustomDetail.js");
        import("./modules/options/saveOptionReferenceDetail.js");
        import("./modules/autoSuggestion/saveAutoSuggestionDetail.js");
        import("./modules/layout/loadLayout.js");

        import("./modules/CardDataReference/loadCardDataReference.js");
        import("./modules/Action/loadRedirectToForm.js");
        import("./modules/CardDataReference/saveCardDataReference.js");
        import("./modules/CardDataReference/loadFromJson.js");
        import("./modules/CardDataReference/saveFromJson.js");
        import("./modules/Action/loadRedirectToUrl.js");
        import("./modules/Action/saveRedirectToUrl.js");
        import("./modules/dataReference/loadDataReference.js");
        import("./modules/dataReference/saveDataReference.js");
        import("./modules/Action/saveRedirectToForm.js");
        import("./modules/options/loadOptionConditionalDetails.js");
        import("./modules/options/saveOptionConditionalDetails.js");
        import(
            "./modules/ChipAvtarDataReference/onLoadChipAndAvtarDataReference.js"
        );
        import(
            "./modules/ChipAvtarDataReference/saveChipAndAvtarDataReference.js"
        );
        import("./modules/FragmentLoad/loadFragment.js");
        import("./modules/FragmentLoad/saveLoadFragment.js");
        import("./modules/FragmentLoad/loadIconActionRedirectToForm.js");
        import("./modules/FragmentLoad/saveIconActionRedirectToForm.js");

        import("./modules/InstanceBehaviour/loadInstanceBehavour.js");
        import("./modules/InstanceBehaviour/saveInstanceBehaviour.js");

        import("./modules/ButtonRedirectionAction/loadRedirectionForm.js");
        import("./modules/ButtonRedirectionAction/saveRedirectionForm.js");
        import("./navbar/navbar-script.js");

        (async () => {
            await checkIsAdmin();
        })();

        loadElementItemsBySection(variables.layoutSection);
        await loadAccountDetails();
        await loadFormDetail();
        loadElementsAndLayoutDetailsByLayout();

        let elementMovedFromIndex = 0,
            elementMovedToIndex = 0;

        // @ts-ignore
        const dreck = dragula([elementContainer, mainContainer], {
            copy: function (el, source) {
                return source === elementContainer;
            },
            accepts: function (el, target) {
                return target === mainContainer;
            },
            slideFactorX: 10,
            slideFactorY: 0,
        });
        dreck
            .on(
                "drag",
                /**
                 *
                 * @param {HTMLElement} el
                 * @param {HTMLElement} target
                 * @param {HTMLElement} source
                 */
                async function (el, source) {
                    if (source === mainContainer) {
                        elementMovedFromIndex = findIndexOfElementFrom(
                            source.children,
                            el
                        );
                    }
                }
            )
            .on(
                "drop",
                /**
                 *
                 * @param {HTMLElement} el
                 * @param {HTMLElement} target
                 * @param {HTMLElement} source
                 */
                async function (el, target, source) {
                    if (
                        target === mainContainer &&
                        source === elementContainer
                    ) {
                        const totalDropableItemsCount =
                            getTotalDropableItemCount();
                        const totalExistingItemCount =
                            mainContainer.children.length - 1;

                        if (
                            isDropable(
                                totalDropableItemsCount,
                                totalExistingItemCount
                            )
                        ) {
                            const elementName = el.getAttribute("data-element");

                            const item =
                                elementStore.getItemByName(elementName);
                            /**
                             * @type {Element}
                             */
                            // @ts-ignore
                            const element = new item.value();

                            el.setAttribute("class", "border mt-2");
                            el.setAttribute("data-wrapper-id", element.id);
                            el.setAttribute("data-element-id", element.id);
                            el.removeAttribute("data-element");

                            const elementIndex = findIndexOfElementFrom(
                                target.children,
                                el
                            );

                            element.setIndex(elementIndex);
                            element.property["section"] =
                                variables.layoutSection;

                            const { success, message, referenceId } =
                                await elementService.saveElement(
                                    element,
                                    variables.formId,
                                    variables.formName
                                );

                            if (!success) {
                                new SnackBar({
                                    message,
                                    status: "error",
                                    dismissible: true,
                                    timeout: 5000,
                                });
                                setTimeout(function () {
                                    window.location.reload();
                                }, 3000);
                                return;
                            }

                            element.property.referenceId = referenceId;
                            elementMap.addElement(element);

                            /**
                             * el has only one child.
                             */
                            el.removeChild(el.children[0]);

                            el.innerHTML = createElementContent(element);

                            new SnackBar({
                                message: `${elementName} added`,
                                status: "success",
                                dismissible: true,
                                timeout: 5000,
                            });
                            return;
                        } else {
                            dreck.remove();
                            new SnackBar({
                                message: `Can't add more than ${totalDropableItemsCount} elements`,
                                status: "info",
                                dismissible: true,
                                timeout: 5000,
                            });
                        }
                    }
                    if (target === mainContainer && source === mainContainer) {
                        elementMovedToIndex = findIndexOfElementFrom(
                            target.children,
                            el
                        );
                        const elementId = el.getAttribute("data-element-id");

                        const { success, message } =
                            await elementService.moveElement(
                                elementMovedFromIndex,
                                elementMovedToIndex,
                                elementId,
                                variables.formId,
                                variables.layoutSection
                            );

                        if (!success) {
                            return;
                        }
                        elementMovedFromIndex = 0;
                        elementMovedToIndex = 0;
                        return;
                    }
                }
            );

        /**
         * @description The reason domElement declare here instead of elements module
         * because element are loaded after loadElementItems() get executed
         */
        const domElements = document.querySelectorAll(
            ".element-container .element"
        );

        domElements.forEach((domElement) => {
            domElement.addEventListener("click", async () => {
                const totalDropableItemsCount = getTotalDropableItemCount();
                const totalExistingItemCount = mainContainer.children.length;

                if (
                    isDropable(totalDropableItemsCount, totalExistingItemCount)
                ) {
                    const elementName = domElement.getAttribute("data-element");

                    const wrapper = document.createElement("div");

                    const item = elementStore.getItemByName(elementName);

                    /**
                     * @type {Element}
                     */
                    // @ts-ignore
                    const element = new item.value();
                    element.property["section"] = variables.layoutSection;

                    const { success, message, referenceId } =
                        await elementService.saveElement(
                            element,
                            variables.formId,
                            variables.formName
                        );

                    if (!success) {
                        new SnackBar({
                            message,
                            status: "error",
                            dismissible: true,
                            timeout: 5000,
                        });
                    }

                    element.property.referenceId = referenceId;

                    elementMap.addElement(element);

                    wrapper.setAttribute("class", "mt-2");
                    wrapper.innerHTML = createElement(element);

                    mainContainer.prepend(wrapper.children[0]);

                    new SnackBar({
                        message: `${elementName} added`,
                        status: "success",
                        dismissible: true,
                        timeout: 5000,
                    });
                    return;
                } else {
                    new SnackBar({
                        message: `Can't add more than ${totalDropableItemsCount} elements`,
                        status: "info",
                        dismissible: true,
                        timeout: 5000,
                    });
                }
            });
        });

        /**
         *
         * @param {number} totalDropableItems
         */
        function isDropable(totalDropableItems, totalExistingItems) {
            return (
                totalDropableItems === -1 ||
                totalExistingItems < totalDropableItems
            );
        }

        function getTotalDropableItemCount() {
            return layoutStore
                .getItemByName(variables.formType)
                .value.getSectionByName(variables.layoutSection)
                .getTotalElementItems();
        }

        const goToReportElement = document.getElementById("go_to_report_link");
        goToReportElement.onclick = goToFormInReports;

        function goToFormInReports() {
            var url = new URL(window.location.href);
            var formId = url.searchParams.get("formId");
            window.location.href = `/reports/${formId}`;
        }

        (async () => {})();
    } else {
        window.location.href = "/signin";
    }
});

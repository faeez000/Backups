import Element from "../../domain/core/Entity/Element.js";
import { elementStore } from "../../domain/Store/index.js";
import { elementService } from "../../services/index.js";
import { variables } from "../../shared/variables.js";
import { createElementPropertiesForm } from "./core/createElementPropertiesFrom.js";
import { clearHints, showHints } from "../../shared/hint.js";
import {
    hintContainer,
    saveElementPropertiesButton,
} from "../../shared/domElements.js";
import { startButtonLoader, stopButtonLoader } from "../../utils/ui/loader.js";

let oldElementPropertyName = undefined;
// @ts-ignore
$("#properties-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    variables.elementId = el.getAttribute("data-id");
    variables.elementName = el.getAttribute("data-name");

    const elementDTO = await elementService.getElementBy(variables.elementId);

    oldElementPropertyName = elementDTO.property["name"];

    clearHints(hintContainer);

    createElementPropertiesForm(elementDTO);

    if (document.querySelector(variables.autofetchDropdownElement)) {
        document
            .querySelector(variables.autofetchDropdownElement)
            .addEventListener("change", (e) => {
                // @ts-ignore
                if (JSON.parse(e.target.value)) {
                    variables.activeFetchType = "value";
                    // @ts-ignore
                    $(variables.autofetchDetailModal).modal("show");
                }
            });
            var isopen = false;

            document
            .querySelector(variables.autofetchDropdownElement).addEventListener('mouseup', (e) => {
                
                if (isopen) {
                    isopen = false;

                    if (JSON.parse(e.target.value)) {
                        variables.activeFetchType = "value";
                        // @ts-ignore
                        $(variables.autofetchDetailModal).modal("show");
                    }
                } else {
                    isopen = true;
                }
            })

            document
            .querySelector(variables.autofetchDropdownElement).addEventListener('blur', () => {
                isopen = false;
            })
    }

    if (document.querySelector(variables.optionTypeDropdownElement)) {
        document
            .querySelector(variables.optionTypeDropdownElement)
            .addEventListener("change", (e) => {
               
                //@ts-ignore
                if (e.target.value === "custom") {
                    //@ts-ignore
                    $(variables.optionCustomDetailsModal).modal("show");
                    
                }
                if (e.target.value === "reference") {
                
                    //@ts-ignore
                    $(variables.optionReferenceDetailsModal).modal("show");
                  
                }
                if (e.target.value === "conditional") {
               
                    //@ts-ignore
                    $(variables.conditionalReferenceDetailsModal).modal("show");
                    
                }
             
            });
            var isopen = false;

            document
            .querySelector(variables.optionTypeDropdownElement).addEventListener('mouseup', (e) => {
                

                if (isopen) {
                    isopen = false;

                    if (e.target.value === "custom") {
                        //@ts-ignore
                        $(variables.optionCustomDetailsModal).modal("show");
                    
                    }
                    if (e.target.value === "reference") {
                        
                        //@ts-ignore
                        $(variables.optionReferenceDetailsModal).modal("show");
                        
                    }
                    if (e.target.value === "conditional") {
                      
                        //@ts-ignore
                        $(variables.conditionalReferenceDetailsModal).modal("show");
                        
                    }
                } else {
                    isopen = true;
                }
                
            })

            document
            .querySelector(variables.optionTypeDropdownElement).addEventListener('blur', () => {
                isopen = false;
            })

    }
    if (document.querySelector(variables.autoSuggestionDropdownElement)) {
        document
            .querySelector(variables.autoSuggestionDropdownElement)
            .addEventListener("change", (e) => {
                //@ts-ignore
                if (JSON.parse(e.target.value)) {
                    //@ts-ignore
                    $(variables.autoSuggestionModal).modal("show");
                }
            });
    }

    if (document.querySelector(variables.dataReference)) {
        // document
        //     .querySelector(variables.dataReference)
        //     .addEventListener("change", (e) => {
        //         //@ts-ignore
        //         if (JSON.parse(e.target.value === "fromtable")) {
        //             //@ts-ignore
        //             $(variables.dataReferenceModal).modal("show");
        //         }
        //         if (JSON.parse(e.target.value === "json")) {
        //             //@ts-ignore
        //             $(variables.typeJsonModal).modal("show");
        //         }
        //     });

            var isopen = false;

            document
            .querySelector(variables.dataReference).addEventListener('mouseup', (e) => {
                

                if (isopen) {
                    isopen = false;

                    if (e.target.value === "fromtable") {
                        //@ts-ignore
                        $(variables.dataReferenceModal).modal("show");
                    
                    }
                    if (e.target.value === "json") {
                          //@ts-ignore
                        $(variables.typeJsonModal).modal("show");
                        
                    }
                } else {
                    isopen = true;
                }
                
            })

            document
            .querySelector(variables.dataReference).addEventListener('blur', () => {
                isopen = false;
            })
    }

    if (document.querySelector(variables.cardDataReference)) {
        document
            .querySelector(variables.cardDataReference)
            .addEventListener("change", (e) => {
                //@ts-ignore
                if (JSON.parse(e.target.value === "fromtable")) {
                    //@ts-ignore
                    $(variables.cardDataReferenceModal).modal("show");
                }
                if (JSON.parse(e.target.value === "json")) {
                    //@ts-ignore
                    $(variables.typeJsonModal).modal("show");
                }
            });
    }

    // if (document.querySelector(variables.autofetchDropdownElement)) {
    //     document
    //         .querySelector(variables.autofetchDropdownElement)
    //         .addEventListener("change", (e) => {
    //             // @ts-ignore
    //             if (JSON.parse(e.target.value)) {
    //                 variables.activeFetchType = "value";
    //                 // @ts-ignore
    //                 $(variables.autofetchDetailModal).modal("show");
    //             }
    //         });
    // }
    if (document.querySelector(variables.actionDropdown)) {
        // document
        //     .querySelector(variables.actionDropdown)
        //     .addEventListener("change", (e) => {
        //         //@ts-ignore
        //         if (e.target.value === "form") {
        //             //@ts-ignore
        //             $(variables.redirectToFormModal).modal("show");
        //         }
        //         if (e.target.value === "url") {
                    
        //             //@ts-ignore
        //             $(variables.redirectToUrlModal).modal("show");
        //         }
        //     });

            var isopen = false;

            document
            .querySelector(variables.actionDropdown).addEventListener('mouseup', (e) => {
                

                if (isopen) {
                    isopen = false;

                    if (e.target.value === "form") {
                       //@ts-ignore
                        $(variables.redirectToFormModal).modal("show");
                    
                    }
                    if (e.target.value === "url") {
                         //@ts-ignore
                        $(variables.redirectToUrlModal).modal("show");
                        
                    }
                } else {
                    isopen = true;
                }
                
            })

            document
            .querySelector(variables.actionDropdown).addEventListener('blur', () => {
                isopen = false;
            })
    }

    if (document.querySelector(variables.avtarDataReferenceDropdown)) {
        document
            .querySelector(variables.avtarDataReferenceDropdown)
            .addEventListener("change", (e) => {

                if (JSON.parse(e.target.value === "fromtable")) {
                    //@ts-ignore
                    $(variables.chipAndAvtarDataReferenceModal).modal("show");
                }
                if (JSON.parse(e.target.value === "json")) {
                    //@ts-ignore
                    $(variables.typeJsonModal).modal("show");
                }
                
            });
    }

    if (document.querySelector(variables.horizontalChipDataReferenceDropdown)) {
        document
            .querySelector(variables.horizontalChipDataReferenceDropdown)
            .addEventListener("change", (e) => {
                // @ts-ignore
                if (JSON.parse(e.target.value === "fromtable")) {
                    //@ts-ignore
                    $(variables.chipAndAvtarDataReferenceModal).modal("show");
                }
                if (JSON.parse(e.target.value === "json")) {
                    //@ts-ignore
                    $(variables.typeJsonModal).modal("show");
                }
            });
    }

    if (document.querySelector(variables.iconActionDropdown)) {
        document
            .querySelector(variables.iconActionDropdown)
            .addEventListener("change", (e) => {
                // @ts-ignore
                if (e.target.value === "form") {
                    //@ts-ignore
                    $(variables.iconActionModal).modal("show");
                }
                if (JSON.parse(e.target.value === "loadFragment")) {
                    //@ts-ignore
                    $(variables.loadFragmentModal).modal("show");
                }
            });
    }

    if (document.querySelector(variables.redirectionDropdown)) {
        document
            .querySelector(variables.redirectionDropdown)
            .addEventListener("change", (e) => {
                //@ts-ignore
                if (e.target.value === "redirect") {
                    //@ts-ignore
                    $(variables.redirectionModal).modal("show");
                }
                
            });
 
            var isopen = false;

            document
            .querySelector(variables.redirectionDropdown).addEventListener('mouseup', (e) => {
                

                if (isopen) {
                    isopen = false;

                    if (e.target.value === "redirect") {
                      //@ts-ignore
                        $(variables.redirectionModal).modal("show");
                    
                    }
                } else {
                    isopen = true;
                }
                
            })

            document
            .querySelector(variables.redirectionDropdown).addEventListener('blur', () => {
                isopen = false;
            })

        }

    if (document.querySelector(variables.instanceTypeDropdown)) {
        document
            .querySelector(variables.instanceTypeDropdown)
            .addEventListener("change", (e) => {
                // @ts-ignore
                if (e.target.value === "automatic") {
                    //@ts-ignore
                    $(variables.instanceBehaviourModal).modal("show");
                }
                
            });
    }
});

document
    .querySelector(variables.propertyForm)
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        startButtonLoader(saveElementPropertiesButton);

        const Element = elementStore.getItemByName(variables.elementName).value;

        /**
         * @type {Element}
         */
        // @ts-ignore
        const element = new Element(variables.elementId);

        document.querySelectorAll(variables.field).forEach(
            /**
             *
             * @param {(HTMLInputElement | HTMLSelectElement)} field
             */
            (field) => {
                if (field.type === "checkbox") {
                    element.property[field.getAttribute("name")] =
                        // @ts-ignore
                        field.checked;
                } else {
                    element.property[field.getAttribute("name")] = field.value;
                }
            }
        );

        const { success, message } = await elementService.updateElement(
            element,
            variables.formId,
            variables.formName,
            oldElementPropertyName
        );
        if (!success) {
            stopButtonLoader(saveElementPropertiesButton, "Save");
            showHints(hintContainer, [message]);
            return;
        }

        new SnackBar({
            message: "Successfully Saved",
            status: "success",
            dismissible: true,
            timeout: 3000,
        });

        /**
         * @type {HTMLInputElement}
         */
        const nameInput = document.querySelector(variables.nameInputId);
        oldElementPropertyName = nameInput.value;

        stopButtonLoader(saveElementPropertiesButton, "Save");
        clearHints(hintContainer);

        return;
    });

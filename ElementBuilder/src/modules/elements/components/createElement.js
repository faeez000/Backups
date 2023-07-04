import Element from "../../../domain/core/Entity/Element.js";

/**
 *
 * @param {Element} element
 * @returns {string}
 */
export function createElement(element) {
    return `
    <div class="border mt-2"  data-wrapper-id="${element.id}"  data-element-id="${element.id}">
        <div>
        <div class="p-3" style="cursor: drag">
            <div class="flex-row-start-center col-12 p-0 w-100">
                <div class="element-label mr-1 w-100 flex-column-start-start">
                    <div class="flex-row-start-center w-100">
                        <div><small>${element.name}</small></div>
                        <div class="ml-2"><span>-</span> </div>
                        <div class="ml-2"><small> reference id ${element.property.referenceId}</small></div>
                    </div>
                </div>
                <div class="action-container p-0">
                <div class="actions flex-row-around-center">
                    <div class="mr-1">
                        <div class="delete mr-1 icon" data-toggle="modal" data-target="#delete-element-modal" data-id="${element.id}" data-name="${element.name}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill icon" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="edit mr-1 icon" data-toggle="modal" data-target="#properties-modal" data-name="${element.name}" data-id="${element.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            </div>
            <div class="flex-row-start-center col-8 p-0 w-100">
            <div class="element-label mr-1 w-100 flex-column-start-start">
                <span style="font-weight:600" id="property-name" data-element-id="${element.id}">${element.property.name}</span>
            </div>
        </div>
       
    </div>
       </div>
    </div>
    `;
}
/**
 *
 * @param {Element} element
 * @returns {string}
 */
export function createElementContent(element) {
    return `<div>
    <div class="p-3" style="cursor: drag">
        <div class="flex-row-start-center col-12 p-0 w-100">
            <div class="element-label mr-1 w-100 flex-column-start-start">
                <div class="flex-row-start-center w-100">
                    <div><small>${element.name}</small></div>
                    <div class="ml-2"><span>-</span> </div>
                    <div class="ml-2"><small> reference id ${element.property.referenceId}</small></div>
                </div>
            </div>
            <div class="action-container p-0">
            <div class="actions flex-row-around-center">
                <div class="mr-1">
                    <div class="delete mr-1 icon" data-toggle="modal" data-target="#delete-element-modal" data-id="${element.id}" data-name="${element.name}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill icon" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="edit mr-1 icon" data-toggle="modal" data-target="#properties-modal" data-name="${element.name}" data-id="${element.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                    </svg>
                </div>
            </div>
        </div>
        </div>
        <div class="flex-row-start-center col-8 p-0 w-100">
        <div class="element-label mr-1 w-100 flex-column-start-start">
            <span style="font-weight:600" id="property-name" data-element-id="${element.id}">${element.property.name}</span>
        </div>
    </div>
   
</div>
   </div>`;
}

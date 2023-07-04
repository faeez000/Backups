import TemplateItem from "../../../domain/ValueObject/TemplateItem.js";

/**
 *
 * @param {TemplateItem} templateItem
 */
export function templateCardComponent(templateItem) {
    return `
    <div class="border-bottom p-2"  data-name="${templateItem.template_name}" id="Template">
        <div class="d-flex flex-row ">
                <div class="card-row-2 col-10" style="padding:2px 0px;"> 
                    <a
                        href="/template/editor?template_id=${templateItem.template_id}&type=template"
                        >${templateItem.template_name}</a
                    >
                </div>
                <div class="item-actions flex-row-end-center col-2 style="margin-left:5%">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" height="16" fill="currentColor" 
                        viewBox="0 0 16 16"
                        class="bi bi-trash-fill icon " 
                        data-toggle="modal" 
                        data-target="#delete-template-modal"
                        style="margin-right: 6px; cursor:pointer" 
                        data-template-id="${templateItem.template_id}"
                        >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" height="16" fill="currentColor" 
                        viewBox="0 0 16 16"
                        class="bi bi-pencil-square icon" 
                        style="margin-right: 4px; cursor:pointer" 
                        data-toggle="modal"
                        data-target="#update-template-name-modal"
                        data-template-id="${templateItem.template_id}"
                        data-template-name="${templateItem.template_name}">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
        </div>
        
    </div>
    `;
}
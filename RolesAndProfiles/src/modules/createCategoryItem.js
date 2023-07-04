import CategoryModel from "../domain/CategoryModel.js";

/**
 *
 * @param {CategoryModel} category
 * @returns {string}
 */
export function createCategoryItem(category) {
    return `
    <div class="c-card col-lg-3 col-md-6 col-sm-6 m-1" id="page-item" data-name="${category["category_name"]}" data-id="${category["category_id"]}">
                <div class="c-card-detail p-2 flex-row-between-center m-0">
                <span class="card-title m-0" title="${category["category_name"]}">${category["category_name"]}</span>
                  <div class="actions flex-row-start-center" style="cursor:pointer;width:15%;">
                  <div class="delete mr-1" data-toggle="modal" data-target="#delete-category-modal" data-id="${category["category_id"]}" data-name="${category["category_name"]}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill icon" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                  </svg>
                </div>
                <div class="edit mr-1" data-toggle="modal" data-target="#edit-category-modal" data-name="${category["category_name"]}" data-id="${category["category_id"]}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square icon" data-edit-id="8a23ad21-ac31-4d56-9247-9dd08cee8244" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                          </svg>
                        </div>
                  </div>
                </div>
             
     </div>
    `;
}

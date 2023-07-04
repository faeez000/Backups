import RightModel from "../../../domain/RightModel.js";

/**
 *
 * @param { RightModel} right
 *
 */
export function rightName(right) {
    return `
  <div class="border-bottom p-2" data-name="${right["rights_name"]}" id="Right" style="background-color: #fafafa;">
        <div class="d-flex justify-content-between ">
            <div class="" style="padding:2px 0px";>  
                <span style="cursor:pointer" id="${right["rights_id"]}" data-id="${right["rights_id"]}" data-right-name="${right["rights_name"]}" data-toggle="modal" data-target="#edit-right-modal" title="${right["rights_name"]}">${right["rights_name"]}</span>
            </div>

            <div class="card-action" style="" >
                <i title="delete" class="bi bi-trash-fill" style="cursor:pointer" data-id="${right["right_id"]}" id="${right["rights_id"]}" data-toggle="modal" data-target="#delete-right-modal"></i>
                <i title="edit" class="bi bi-pencil-square" style="cursor:pointer" id="${right["rights_id"]}" data-id="${right["rights_id"]}" data-right-name="${right["rights_name"]}"  data-toggle="modal" data-target="#edit-right-name-modal"></i>
            </div>
        

        </div>
    </div>
    `;
}

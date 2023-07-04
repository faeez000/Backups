export function roleName(role) {
    return `
   
    <div class="d-flex  justify-content-between align-items-center border-bottom p-2" style="background-color: #fafafa;">
      
        <div class="card-row-2" style="padding:2px 0px;">  
            <span title="${role["role_name"]}">${role["role_name"]}</span>
        </div>

        <div class="card-row-1">
            <div class="card-action">
                <i title="delete" class="bi bi-trash-fill" style="cursor:pointer" data-gateway="no" data-id="${role["role_id"]}" id="${role["role_id"]}" data-toggle="modal" data-target="#delete-role-modal"></i>
                <i title="edit" class="bi bi-pencil-square" style="cursor:pointer" id="edit-btn" data-id="${role["role_id"]}" data-role-name="${role["role_name"]}" data-reports-to="${role["reports_to"]}" data-accessible-to-same-level="${role["accessible_to_same_level"]}" data-roles-description="${role["roles_description"]}" data-role-image="${role["role_image"]}"  data-toggle="modal" data-target="#edit-role-modal"></i>
            </div>            
        </div> 
    </div>
    `;
}

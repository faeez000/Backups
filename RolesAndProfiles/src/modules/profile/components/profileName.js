export function profileName(profile) {
    return `
  <div class="border-bottom p-2" data-name="${profile["profile_name"]}" id="Profile" style="background-color: #fafafa;">
        <div class="d-flex justify-content-between">
            <div class="" style="padding:2px 0px;">  
                <span title="${profile["profile_name"]}">${profile["profile_name"]}</span>
            </div>

            <div class="card-action" >
                <i title="delete" class="bi bi-trash-fill" style="cursor:pointer" data-gateway="no" data-id="${profile["profile_id"]}" id="${profile["profile_id"]}" data-toggle="modal" data-target="#delete-profile-modal"></i>
                 <i title="edit" class="bi bi-pencil-square" style="cursor:pointer" id="${profile["profile_id"]}" data-landingid="${profile["select_landing_formid"]}" data-id="${profile["profile_id"]}" data-rightname="${profile["edit_right_name"]}" data-description="${profile["description"]}" data-toggle="modal" data-target="#edit-profile-modal"></i>
            </div>            
        </div> 
    </div>
    `;
}

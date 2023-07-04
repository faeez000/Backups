export function organizationName(organizations, isAdmin) {
    return `
    <div class="border-bottom p-2" data-name="${
        organizations["organization_name"]
    }" id="Organization">
        <div class="d-flex flex-row ">
                <div class="card-row-2 col-10" style="padding:2px 0px;">  
                    <a href="/features" class="orglink" name="orglink">
                        <span id="${organizations["organization_id"]}">
                            ${organizations["organization_name"]}
                        </span> 
                    </a>
                </div>
                
                <div class="card-action col-2" style="margin-left:5%">
                    ${shouldLoadEditAndDeleteContollers(
                        isAdmin,
                        organizations.organization_id
                    )}
                </div>           
        </div>
    </div>
    `;
}
function shouldLoadEditAndDeleteContollers(value, id) {
    if (value) {
        return `
        <i title="edit" class="bi bi-pencil-square" style="cursor:pointer" id="${id}" data-id="${id}" data-toggle="modal" data-target="#edit-organization-modal"></i>
        <i title="delete" class="bi bi-trash-fill" style="cursor:pointer" data-gateway="no" data-id="${id}" id="${id}" data-toggle="modal" data-target="#delete-organization-modal"></i>
            `;
    }
    return "";
}

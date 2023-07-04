export function userName(user) {
    return `
    <div class="border-bottom " data-name="${user["user_email_id"]}" id="User" style="background-color: #fafafa; position:relative;padding:10px">
        <div class="d-flex justify-content-between">
                <div style="padding:2px 0px;">  
                
                
                    <div class="" style="line-height: normal" title="${user["user_email_id"]}">
                        <small style="color:gray; font-size: 11px;">Email:</small><br/> 
                        <span style=" font-size: 17px;">${user["user_email_id"]}</span>
                    </div>       
                </div>
        
        
                <span class="px-2" style=" font-size: 12px; background-color:#b64640; 
                color:white;position:absolute; right:0;top:0">
                ${handleNull(user["InvitationStatus"])}
                </span>  
       
            <div class="card-action" style="padding:2px 0px; margin-top: 2%";>
                <i title="delete" class="bi bi-trash-fill" style="cursor:pointer"  data-id="${user["user_id"]}" 
                    id="${user["id"]}" data-toggle="modal"data-target="#delete-user-modal">
                </i>
                <i title="edit" class="bi bi-pencil-square" style="cursor:pointer" data-id="${user["user_id"]}"
                    id="${user["id"]}" data-user-email="${user["user_email_id"]}" 
                    data-user-role="${user["role_name"]}" data-user-profile="${user["profile_name"]}" 
                    id="edit-btn" data-toggle="modal" data-target="#edit-user-modal">
                </i>
            </div>            
        </div> 
    </div>
    `;
}

function handleNull(value) {
    return value === "accepted" ? "" : "Invitation Pending...";
}

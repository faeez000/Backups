// @ts-nocheck

import { loadUserItems } from "./loadUserItems.js";
import UserModel from "../../domain/UserModel.js";
import { userService } from "../../services/index.js";
import {
    editUserForm,
    editEmailId,
    editUserRoleForUser,
    editUserProfileForUser,
    editUserAdmin,
    editUserName,
    editUserProfileContainer,
} from "../../shared/elements.js";

let userId, userEmail, userProfile, userRole, userName, userAdmin, id;
// @ts-ignore
$("#edit-user-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];
    userId = el.getAttribute("data-id");
    userEmail = el.getAttribute("data-user-email");
    userRole = el.getAttribute("data-user-role");
    userProfile = el.getAttribute("data-user-profile");
    id = el.getAttribute("id");

    const { success, usersDetails } = await userService.getUserDetailsById(id);
   
    if (success) {
        

        editUserProfileContainer.style.display= usersDetails.user_administrator ? "none" :"flex"
        
        
        editEmailId.value = userEmail;
        // editUserRoleForUser.value = usersDetails.role_name;

        editUserProfileForUser.value = usersDetails.user_profile_id;
        editUserAdmin.checked = usersDetails.user_administrator;
    }
});

editUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const checkbox = editUserAdmin.checked;
    const formData = new FormData(editUserForm);
    formData.append("user_administrator", checkbox);
    formData.append("id", id);

  

    const user = new UserModel(userId);

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        user[key] = value.trim();
    }
    
    if (!user.user_profile   && editUserAdmin.checked === false ) {
        new SnackBar({
            message: "Please Fill Details",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    const { success, message } = await userService.update(user);

    if (!success) {
        // @ts-ignore
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    new SnackBar({
        message,
        status: "info",
        dismissible: true,
        timeout: 5000,
    });
    // @ts-ignore
    $("#edit-user-modal").modal("hide");
    await loadUserItems();
    // @ts-ignore
    e.target.reset();
    return;
});


editUserAdmin.addEventListener("click",()=>{
    editUserProfileContainer.style.display = editUserAdmin.checked ? "none" :"flex";
    editUserProfileForUser.value ="none"

})
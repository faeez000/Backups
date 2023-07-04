import { adminCheck, createNewUserForm,userModalProfileContainer,selectUserProfileForUser } from "../../shared/elements.js";
// import { loadCategory } from "../loadCategory.js";
import { loadUserItems } from "./loadUserItems.js";
import UserModel from "../../domain/UserModel.js";
import { userService } from "../../services/index.js";
import { loadProfileItems } from "../profile/loadprofileitems.js";

createNewUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const checkbox = adminCheck.checked;
    const formData = new FormData(createNewUserForm);
    formData.append("user_administrator", checkbox);
    const user = new UserModel();

    for (var [key, value] of formData.entries()) {
        user[key] = value.trim();
    }
    if (!user.user_email ||  !user.user_profile   && adminCheck.checked === false ) {
        new SnackBar({
            message: "Please Fill Details",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    const { success, message } = await userService.create(user);

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
    $("#create-new-user-modal").modal("hide");
    await loadUserItems();
    // @ts-ignore
    e.target.reset();
    return;
});

adminCheck.addEventListener("click",()=>{
    userModalProfileContainer.style.display = adminCheck.checked? "none" : "flex"
    selectUserProfileForUser.value ="none"
    
})
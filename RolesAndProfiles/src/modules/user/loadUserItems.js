import UserModel from "../../domain/UserModel.js";
import { userService } from "../../services/index.js";
import { userItemContainer } from "../../shared/elements.js";
import { userName } from "./component/userName.js";
// import { createProfileItem } from "./createNewProfile.js";

export async function loadUserItems() {
    userItemContainer.innerHTML = "fetching...";
    const { success, users } = await userService.getUsers();
    if (!success) {
        return;
    }
    userItemContainer.innerHTML = "";
    users.forEach(
        /**
         *
         * @param {UserModel} user
         */
        (user) => {
            const userModel = new UserModel(
                user["user_id"],
                user["user_email_id"],
                user["profile_name"],
                user["InvitationStatus"]
            );
            userItemContainer.innerHTML += userName(user);
        }
    );
}

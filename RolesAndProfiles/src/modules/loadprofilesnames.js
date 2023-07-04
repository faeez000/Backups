import ProfileModel from "../domain/ProfileModel.js";
import { commonService } from "../services/index.js";
import {
    editUserProfileForUser,
    selectUserProfileForUser,
} from "../shared/elements.js";
//import { profileName } from "./components/profileName.js";
import { createOption } from "./createOption.js";

export async function loadProfilesNames() {
    const { success, profilesnames } = await commonService.getprofilesnames();
    if (!success) {
        return;
    }
    selectUserProfileForUser.innerHTML = "";
    editUserProfileForUser.innerHTML = "";

    selectUserProfileForUser.innerHTML += selectProfileOption();

    profilesnames.forEach(
        /**
         * @param {ProfileModel} profiles
         */
        (profiles) => {
            editUserProfileForUser.appendChild(
                createOption(profiles["profile_id"], profiles["profile_name"])
            );
            selectUserProfileForUser.appendChild(
                createOption(profiles["profile_id"], profiles["profile_name"])
            );
        }
    );
}
function selectProfileOption() {
    return `<option selected disabled>--Select Profile--</option>`;
}

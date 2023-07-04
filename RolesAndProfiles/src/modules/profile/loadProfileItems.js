import ProfileModel from "../../domain/ProfileModel.js";
import { profileService } from "../../services/index.js";
import { profileItemContainer } from "../../shared/elements.js";
import { profileName } from "./components/profileName.js";

export async function loadProfileItems() {
    profileItemContainer.innerHTML = "fetching...";
    const { success, profiles } = await profileService.getProfiles();
    if (!success) {
        return;
    }

    profileItemContainer.innerHTML = "";
    profiles.forEach(
        /**
         *
         * @param {ProfileModel} profile
         */
        (profile) => {
            const profileModel = new ProfileModel(
                profile["profile_id"],
                profile["profile_name"]
            );
            profileItemContainer.innerHTML += profileName(profile);
        }
    );
}

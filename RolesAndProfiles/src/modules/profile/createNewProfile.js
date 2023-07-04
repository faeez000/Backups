import { createNewProfileForm } from "../../shared/elements.js";
// import { loadCategory } from "../loadCategory.js";
import { loadProfileItems } from "./loadProfileItems.js";
import ProfileModel from "../../domain/ProfileModel.js";
import { profileService } from "../../services/index.js";
import { loadRightsNames } from "../loadrightsnames.js";
import { loadUserItems } from "../user/loaduseritems.js";
import { loadProfilesNames } from "../loadprofilesnames.js";
// import { loadMobilelandingPage } from "../loadMobileLandingPage";

createNewProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createNewProfileForm);

    const profile = new ProfileModel();

    for (var [key, value] of formData.entries()) {
        profile[key] = value.trim();
    }

    if (!profile.profile_name || !profile.profile_description || !profile.select_rights_id || profile.select_rights_id ==="null" ) {
        new SnackBar({
            message: "Please Fill Details",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    const { success, message } = await profileService.create(profile);

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
        status: "success",
        dismissible: true,
        timeout: 5000,
    });

    // @ts-ignore
    document.getElementById("create-new-profile").reset();
    $("#create-new-profile-modal").modal("hide");
    await loadRightsNames();
    await loadProfileItems();
    await loadProfilesNames();
    await loadUserItems();
    e.target.reset();

    return;
});

import {
    editProfileForm,
    edtProfileName,
    editselectRightsNameForProfile,
    editProfileDescriptionForProfile,
    editMobileLandingPageforProfile,
} from "../../shared/elements.js";
import { loadProfileItems } from "./loadProfileItems.js";
import ProfileModel from "../../domain/ProfileModel.js";
import { profileService } from "../../services/index.js";
import { loadRightsNames } from "../loadrightsnames.js";

let profileId, profileName, selectRightsId, profileDescription, landingFormID;
// @ts-ignore
$("#edit-profile-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    profileId = el.getAttribute("data-id");
    profileName = el.getAttribute("data-name");
    selectRightsId = el.getAttribute("data-rightid");
    profileDescription = el.getAttribute("data-description");
    landingFormID = el.getAttribute("data-landingid");

    const { success, profileDetails } =
        await profileService.getProfileDetailsById(profileId);

    if (success) {
        edtProfileName.value = profileDetails.profile_name;
        if (profileDetails.select_rights_id === "") {
            /**
             * @type {HTMLInputElement}
             */
            editselectRightsNameForProfile.value = "null";
        } else {
            editselectRightsNameForProfile.value =
                profileDetails.select_rights_id;
        }
        editProfileDescriptionForProfile.value =
            profileDetails.profile_description;
        editMobileLandingPageforProfile.value =
            profileDetails.select_landing_formid;
    }
});

editProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(editProfileForm);

    const profile = new ProfileModel(profileId);

    for (var [key, value] of formData.entries()) {
        if (key === "select_rights_id" && value === "") {
            profile[key] = null;
        } else {
            // @ts-ignore
            profile[key] = value.trim();
        }
    }

    

    if (!profile.profile_name || !profile.profile_description || profile.select_rights_id==="null" || !profile.select_rights_id ) {
        new SnackBar({
            message: "Please Fill Details",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    const { success, message } = await profileService.update(profile);

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
    $("#edit-profile-modal").modal("hide");
    await loadProfileItems();
    // @ts-ignore
    e.target.reset();
    return;
});

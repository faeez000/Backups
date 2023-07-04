import { deleteProfileForm } from "../../shared/elements.js";
import { loadProfileItems } from "./loadProfileItems.js";
import profileModel from "../../domain/profileModel.js";
import { profileService } from "../../services/index.js";
import { loadUserItems } from "../user/loaduseritems.js";
import { loadProfilesNames } from "../loadprofilesnames.js";

let profileId, formId;
// @ts-ignore
$("#delete-profile-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    profileId = el.getAttribute("id");
    formId = el.getAttribute("data-form");

    // const { success, profileDetails } =
    //     await profileService.getProfileDetailsById(profileId);
});

deleteProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { success, message } = await profileService.deleteBy(profileId);

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
    $("#delete-profile-modal").modal("hide");
    await loadProfileItems();
    await loadProfilesNames();
    await loadUserItems();
    e.target.reset();

    return;
});

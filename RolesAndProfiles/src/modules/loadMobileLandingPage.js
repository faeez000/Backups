import ProfileModel from "../domain/ProfileModel.js";
import { profileService } from "../services/index.js";
import {
    selectMobileLandingPageforProfile,
    editMobileLandingPageforProfile,
} from "../shared/elements.js";
//import { profileName } from "./components/profileName.js";
import { createOption } from "./createOption.js";

export async function loadMobileLandingPage() {
    const { success, formNames } = await profileService.getMobileLandingPage();
    if (!success) {
        return;
    }

    selectMobileLandingPageforProfile.innerHTML = "";
    editMobileLandingPageforProfile.innerHTML = "";

    selectMobileLandingPageforProfile.innerHTML += selectLandingPageOption();
    editMobileLandingPageforProfile.innerHTML += noLandingPageOption();

    formNames.forEach((form) => {
        selectMobileLandingPageforProfile.appendChild(
            createOption(form["form_id"], form["form_name"])
        );
        editMobileLandingPageforProfile.appendChild(
            createOption(form["form_id"], form["form_name"])
        );
    });
}
function selectLandingPageOption() {
    return `<option selected value="null">--Select Form--</option>`;
}

function noLandingPageOption() {
    return `<option value="null">No Page</option>`;
}

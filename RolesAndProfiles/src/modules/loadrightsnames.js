import ProfileModel from "../domain/ProfileModel.js";
import { commonService } from "../services/index.js";
import {
    editselectRightsNameForProfile,
    selectRightsNameForProfile,
} from "../shared/elements.js";
//import { profileName } from "./components/profileName.js";
import { createOption } from "./createOption.js";

export async function loadRightsNames() {
    const { success, rightsnames } = await commonService.getrightsnames();
    if (!success) {
        return;
    }

    editselectRightsNameForProfile.innerHTML = "";
    selectRightsNameForProfile.innerHTML = "";

    selectRightsNameForProfile.innerHTML += selectRightOption();
    editselectRightsNameForProfile.innerHTML += noRightOption();

    rightsnames.forEach(
        /**
         * @param {ProfileModel} rights
         */
        (rights) => {
            editselectRightsNameForProfile.appendChild(
                createOption(rights["rights_id"], rights["rights_name"])
            );
            selectRightsNameForProfile.appendChild(
                createOption(rights["rights_id"], rights["rights_name"])
            );
        }
    );
}

function selectRightOption() {
    return `<option selected value="null">--Select Right--</option>`;
}

function noRightOption() {
    return `<option class="text-secondary" value="null">No Right</option>`;
}

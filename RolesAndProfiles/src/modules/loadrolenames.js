import RoleModel from "../domain/RoleModel.js";
import { commonService } from "../services/index.js";
import {
    editUserRoleForUser,
    editUserProfileForUser,
    selectUserRoleForUser,
    selectUserProfileForUser,
    reportsTo,
    editReportsTo,
} from "../shared/elements.js";
//import { profileName } from "./components/profileName.js";
import { createOption } from "./createOption.js";

export async function loadRolesNames() {
    const { success, rolesnames } = await commonService.getrolesnames();
    if (!success) {
        return;
    }
    editUserRoleForUser.innerHTML = "";
    reportsTo.innerHTML = "";
    editReportsTo.innerHTML = "";
    selectUserRoleForUser.innerHTML = "";

    rolesnames.forEach(
        /**
         * @param {RoleModel} roles
         */
        (roles) => {
            editUserRoleForUser.appendChild(
                createOption(roles["role_id"], roles["role_name"])
            );
            reportsTo.appendChild(
                createOption(roles["role_id"], roles["role_name"])
            );
            editReportsTo.appendChild(
                createOption(roles["role_id"], roles["role_name"])
            );
            selectUserRoleForUser.appendChild(
                createOption(roles["role_id"], roles["role_name"])
            );
        }
    );
}

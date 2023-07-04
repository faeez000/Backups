import RoleModel from "../../domain/RoleModel.js";
import { roleService } from "../../services/index.js";
import { roleItemContainer } from "../../shared/elements.js";
import { roleName } from "./component/roleName.js";
// import { createProfileItem } from "./createNewProfile.js";

export async function loadRoleItems() {
    roleItemContainer.innerHTML = "fetching...";
    const { success, roles } = await roleService.getRoles();
    if (!success) {
        return;
    }
    roleItemContainer.innerHTML = "";
    roles.forEach(
        /**
         *
         * @param {RoleModel} role
         */
        (role) => {
            const roleModel = new RoleModel(
                role["role_id"],
                role["role_name"],
                role["reports_to"],
                role["accessible_to_same_level"],
                role["roles_description"],
                role["role_image"]
            );
            roleItemContainer.innerHTML += roleName(role);
        }
    );
}

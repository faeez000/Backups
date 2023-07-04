import {
  editAccessibleToSameLevel,
  editDescriptionForRole,
  editHiddenRoleImage,
  editReportsTo,
  editRoleImageLabel,
  editRoleName,
  updateRoleForm,
} from "../../shared/elements.js";
import { variables } from "../../shared/variables.js";
// import { loadCategory } from "../loadCategory.js";
import { loadRoleItems } from "./loadRoleItems.js";
import RoleModel from "../../domain/RoleModel.js";
import { imageUploadService, roleService } from "../../services/index.js";

let roleId, roleName;
// @ts-ignore
$("#edit-role-modal").on("show.bs.modal", async function (e) {
  // @ts-ignore
  const el = $(e.relatedTarget)[0];

  roleId = el.getAttribute("data-id");

  const { success, roleDetails } = await roleService.getRoleDetailsById(roleId);

  if (success) {
    editRoleName.value = roleDetails.role_name;
    editReportsTo.value = roleDetails.reports_to;
    editAccessibleToSameLevel.checked = roleDetails.accessible_to_same_level;
    editDescriptionForRole.value = roleDetails.role_description;
    editHiddenRoleImage.value = roleDetails.role_image;
    editRoleImageLabel.textContent = roleDetails.role_image.split("/").pop();
  }
});

document
  .querySelector(variables.editRoleFieldForm)
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = new RoleModel(roleId);
    document.querySelectorAll(variables.editRole).forEach(
      /**
       *
       * @param {(HTMLInputElement | HTMLSelectElement)} field
       */
      (field) => {
        if (field.type === "checkbox") {
          role[field.getAttribute("name")] =
            // @ts-ignore
            field.checked;
        } else {
          role[field.getAttribute("name")] = field.value;
        }
      }
    );

    const { success, message } = await roleService.update(role);

    if (!success) {
      roleId = null;
      // @ts-ignore
      new SnackBar({
        message,
        status: "info",
        dismissible: true,
        timeout: 5000,
      });
      return;
    }
    roleId = null;
    // @ts-ignore
    $("#edit-category-modal").modal("hide");
    await loadRoleItems();
    await loadRolesNames();
    // @ts-ignore
    e.target.reset();
    return;
  });

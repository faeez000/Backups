import { deleteRoleForm } from "../../shared/elements.js";
import { loadRoleItems } from "./loadRoleItems.js";
import roleModel from "../../domain/RoleModel.js";
import { roleService } from "../../services/index.js";
import { loadRolesNames } from "../loadrolenames.js";

let roleId, formId;
// @ts-ignore
$("#delete-role-modal").on("show.bs.modal", async function (e) {
  // @ts-ignore
  const el = $(e.relatedTarget)[0];

  roleId = el.id;
  formId = el.getAttribute("data-form");

  const { success, roleDetails } = await roleService.getRoleDetailsById(roleId);
});

deleteRoleForm.addEventListener("submit", async (e) => {
  {
    e.preventDefault();

    const { success, message } = await roleService.deleteBy(roleId);

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
  }
  // @ts-ignore
  $("#delete-role-modal").modal("hide");
  await loadRoleItems();
  await loadRolesNames();
  // @ts-ignore
  e.target.reset();
  return;
});

import { createNewRoleForm } from "../../shared/elements.js";
import { variables } from "../../shared/variables.js";
// import { loadCategory } from "../loadCategory.js";
import { loadRoleItems } from "./loadRoleItems.js";
import RoleModel from "../../domain/RoleModel.js";
import { imageUploadService, roleService } from "../../services/index.js";
import { loadRightsNames } from "../loadrightsnames.js";
import { loadRolesNames } from "../loadrolenames.js";
// import { addImageUploaderUploader } from "../../shared/modules/addImageUploader.js";

createNewRoleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(createNewRoleForm);

  const role = new RoleModel();
  document.querySelectorAll(variables.roleField).forEach(
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

  const { success, message } = await roleService.create(role);
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
  // @ts-ignore
  $("#create-new-role-modal").modal("hide");
  await loadRoleItems();
  await loadRolesNames();
  await createNewRoleForm.reset();

  thumbnailInputLabel.textContent = "Choose File";
  photoInputLabel.textContent = "Choose File";
  thumbnailHiddenInput.value = "";
  photoHiddenInput.value = "";

  AccessibleToSameLevel.checked = false;
  DescriptionForRole.value = "";
  HiddenRoleImage.value = "";
  RoleImageLabel.textContent = "Choose File";

  return;
});

// @ts-nocheck

import OrganizationModel from "../../domain/OrganizationModel.js";
import { organizationInfoService } from "../../services/index.js";
import {
  organizationName,
  organizationlogo,
  organizationSize,
  hierarchyTypeName,
  industryType,
  saveOrganizationbtn,
} from "../../shared/elements.js";

let userId, organizationId;

// @ts-ignore
saveOrganizationbtn.addEventListener("click", async () => {
  // @ts-ignore

  const organization = new OrganizationModel();

  organization["organization_name"] = organizationName.value;
  organization["logo"] = organizationlogo.value;
  organization["organization_size"] = organizationSize.value;
  organization["hierarchy_type"] = hierarchyTypeName.value;
  organization["industryType"] = industryType.value;

  const { success, message } = await organizationInfoService.update(
    organization
  );

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
  $("#edit-user-modal").modal("hide");
  await loadUserItems();
  // @ts-ignore
  e.target.reset();
  return;
});

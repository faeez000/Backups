// @ts-nocheck

import { organizationSwitchService } from "../../services/index.js";
import OrganizationModel from "../../domain/SwitchModel/OrganizationModel.js";
import {
    editOrganizationName,
    editOrganizationLogo,
    editOrganizationSize,
    editHierarchyTypeName,
    editIndustryType,
    editOrganizationForm,
} from "../../shared/elements.js";
import { loadOrganizatioNamesByUserId } from "../Selection/loadAllOrganizationsByUserId.js";

let userId, organizationId;

// @ts-ignore
$("#edit-organization-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];
    organizationId = el.getAttribute("id");
    const { success, organizationdetails } =
        await organizationSwitchService.getOrganizationDetailsByOrganizationId(
            organizationId
        );
    if (success) {
        editOrganizationName.value = organizationdetails.organization_name;
        editOrganizationSize.value = organizationdetails.organization_size;
        // editOrganizationLogo.value = organizationdetails.logo;
        editHierarchyTypeName.value = organizationdetails.hierarchy_type;
        editIndustryType.value = organizationdetails.industry_type;
        // if (profileDetails.select_rights_id === "") {
        //   /**
        //    * @type {HTMLInputElement}
        //    */
        //   editselectRightsNameForProfile.value = "null";
        // } else {
        //   editselectRightsNameForProfile.value = profileDetails.select_rights_id;
        // }
        // editProfileDescriptionForProfile.value = profileDetails.profile_description;
    }
});
editOrganizationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(editOrganizationForm);
    const organization = new OrganizationModel(organizationId);

    for (var [key, value] of formData.entries()) {
        // @ts-ignore
        organization[key] = value.trim();
    }

    const { success, message } = await organizationSwitchService.update(
        organization
    );

    if (success) {
        // @ts-ignore
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
    }

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
    $("#edit-organization-modal").modal("hide");
    await loadOrganizatioNamesByUserId();
    // @ts-ignore
    e.target.reset();
    return;
});

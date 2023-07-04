import OrganizationModel from "../../domain/SwitchModel/OrganizationModel.js";
import { organizationSwitchService } from "../../services/index.js";
import { createOrganizationForm } from "../../shared/elements.js";
import { loadOrganizatioNamesByUserId } from "../../modules/Selection/loadAllOrganizationsByUserId.js";

createOrganizationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createOrganizationForm);

    const organization = new OrganizationModel();

    for (var [key, value] of formData.entries()) {
        organization[key] = value;
    }
    const { success, message } = await organizationSwitchService.create(
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
    $("#create-new-organization-modal").modal("hide");
    await loadOrganizatioNamesByUserId();
    // @ts-ignore
    e.target.reset();
    return;
});

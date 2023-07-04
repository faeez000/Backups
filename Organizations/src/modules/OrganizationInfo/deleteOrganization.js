import { deleteOrganizationForm } from "../../shared/elements.js";
import { organizationSwitchService } from "../../services/index.js";
import { loadOrganizatioNamesByUserId } from "../Selection/loadAllOrganizationsByUserId.js";

let userId, formId, organizationId;

// @ts-ignore
$("#delete-organization-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    userId = el.getAttribute("id");
    organizationId = el.getAttribute("data-id");
});

deleteOrganizationForm.addEventListener("submit", async (e) => {
    {
        e.preventDefault();

        const { success, message } = await organizationSwitchService.deleteBy(
            organizationId
        );
        if (success) {
            // @ts-ignore
            new SnackBar({
                message,
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
        }
        if (!success) {
            // @ts-ignore
            new SnackBar({
                message: "Not Deleted",
                status: "info",
                dismissible: true,
                timeout: 5000,
            });
            return;
        }
    }
    // @ts-ignore
    $("#delete-organization-modal").modal("hide");
    await loadOrganizatioNamesByUserId();
    // @ts-ignore
    e.target.reset();
    return;
});

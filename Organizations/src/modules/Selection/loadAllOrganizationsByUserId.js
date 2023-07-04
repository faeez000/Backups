import { organizationSwitchService } from "../../services/index.js";
import OrganizationModel from "../../domain/SwitchModel/OrganizationModel.js";
import { organizationName } from "./components/organizationSwitch.js";

import { organizationItemContainer } from "../../shared/elements.js";
import { loadOrganizationInfo } from "../OrganizationInfo/loadOrganizationInfo.js";
import { searchOrganizationInput } from "../../shared/elements.js";
export async function loadOrganizatioNamesByUserId() {
    organizationItemContainer.innerHTML = `<div class="d-flex justify-content-center mt-5" style="width:100%;"><div class="loader_spinner"></div></div> `;
    const { success, organizationsnames } = await organizationSwitchService.showAllOrganizationsByUserId();
    // const success = false;
    if (!success) {
        organizationItemContainer.innerHTML = ` <h4 class="error-organization text-secondary mt-5" style="width: 100%; text-align:center;">
                                                 Retry again!
                                                    </h4>`;
        return;
    }

    let testingArr = [];
    for (let organization of organizationsnames) {
        const { isAdmin } = await organizationSwitchService.checkIsAdmin(
            organization["organization_id"]
        );
        testingArr.push(organizationName(organization, isAdmin));
    }
    organizationItemContainer.innerHTML = "";
    organizationItemContainer.innerHTML = testingArr.join("");
    document.dispatchEvent(new Event("load.organization"));
}

document.addEventListener("load.organization", () => {
    var links = document.querySelectorAll(".orglink");
    links.forEach((link) => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            var orgId = e.target.getAttribute("id");

            const { success, message } =
                await organizationSwitchService.updateRecentOrganization(orgId);

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
            await new SnackBar({
                message,
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
            searchOrganizationInput.value = "";
            await loadOrganizationInfo();
            location.href = location.origin + "/features";
        });
    });
});

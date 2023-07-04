import OrganizationModel from "../../domain/SwitchModel/OrganizationModel.js";
import { organizationSwitchService } from "../../services/index.js";
import {
    organizationName,
    organizationlogo,
    organizationSize,
    hierarchyTypeName,
    industryType,
} from "../../shared/elements.js";

export async function loadOrganizationInfo() {
    const { success, organizationinfo } =
        await organizationSwitchService.getOrganizationDetailsById();
    if (!success) {
        return;
    }

    // organizationSize.selectedIndex = 0;
    // hierarchyTypeName.selectedIndex = 0;
    // industryType.selectedIndex = 0;
    // organizationinfo.forEach(
    //     /**
    //      *
    //      * @param {OrganizationModel} organizationInfo
    //      */
    //     (organizationInfo) => {
    //         const organizationModel = new OrganizationModel(
    //             organizationInfo["organization_name"],
    //             organizationInfo["organization_size"],
    //             organizationInfo["hierarchy_type"],
    //             organizationInfo["industry_type"]
    //         );
    //         //profileItemContainer.innerHTML += profileName(organizationInfo);
    //     }
    // );
}

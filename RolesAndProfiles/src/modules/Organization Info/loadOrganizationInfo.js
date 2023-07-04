import OrganizationModel from "../../domain/OrganizationModel.js";
import { organizationInfoService } from "../../services/index.js";
import {
    organizationName,
    organizationlogo,
    organizationSize,
    hierarchyTypeName,
    industryType,
} from "../../shared/elements.js";

export async function loadOrganizationInfo() {
    const { success, organizationinfo } =
        await organizationInfoService.getOrganizationDetailsById();
    if (!success) {
        return;
    }
    organizationName.value = "";
    //   organizationSize.selectedIndex = 0;
    //   hierarchyTypeName.selectedIndex = 0;
    //   industryType.selectedIndex = 0;
    organizationinfo.forEach(
        /**
         *
         * @param {OrganizationModel} organizationInfo
         */
        (organizationInfo) => {
            const organizationModel = new OrganizationModel(
                (organizationName.value =
                    organizationInfo["organization_name"]),
                (organizationSize.value =
                    organizationInfo["organization_size"]),
                (hierarchyTypeName.value = organizationInfo["hierarchy_type"]),
                (industryType.value = organizationInfo["industry_type"])
            );
            //profileItemContainer.innerHTML += profileName(organizationInfo);
        }
    );
}

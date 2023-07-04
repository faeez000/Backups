import { v4 as uuidv4 } from "uuid";

export default class OrganizationModel {
    constructor(
        organizationId = null,
        organizationName = null,
        logo = null,
        organizationSize = null,
        hierarchyType = null,
        industryType = null
    ) {
        // @ts-ignore
        this.organization_id = !!organizationId ? organizationId : uuidv4();
        this.organization_name = organizationName;
        this.logo = logo;
        this.organization_size = organizationSize;
        this.hierarchy_type = hierarchyType;
        this.industry_type = industryType;
    }
}

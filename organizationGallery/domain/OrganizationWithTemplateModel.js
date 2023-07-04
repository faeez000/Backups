export default class OrganizationWithTemplateModel {
    constructor(
        organizationName = null,
        logo = null,
        organizationSize = null,
        hierarchyType = null,
        industryType = null
    ) {
        // @ts-ignore

        this.organization_Name = organizationName;
        this.logo = logo;
        this.organization_Size = organizationSize;
        this.hierarchy_Type = hierarchyType;
        this.industry = industryType;
    }
}

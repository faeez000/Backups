export default class OrganizationModel {
    /**
     *
     * @param {string} organizationId
     * @param {string} organizationName
     * @param {string} logo
     * @param {string} organizationSize
     * @param {string} hierarchyType
     * @param {string} industryType
     * @param {string} adminId
     */
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

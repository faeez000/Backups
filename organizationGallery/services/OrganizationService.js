import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class OrganizationService extends BaseAPIService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        super(baseURL);
    }

    async create(organization) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.post(
                `${this.baseURL}/organizationSelection/createOrganization`,
                organization,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.organization = [];
                return { success: true };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async organizationWithTemplate(organization, TemplateId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.post(
                `${this.baseURL}/admin/settings/Organization/CreateOrganizationwithTemplate?TemplateId=${TemplateId}`,
                organization,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.organization = [];
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

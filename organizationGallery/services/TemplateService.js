import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class TemplateService extends BaseAPIService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        super(baseURL);
    }

    async allTemplates() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/admin/settings/Organization/AllTemplate`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, templates: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
}

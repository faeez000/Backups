import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class TemplateApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getTemplatesByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/templatebuilder/templates?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, templates: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { TemplateApiService };

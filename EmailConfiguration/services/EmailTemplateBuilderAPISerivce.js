import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class EmailTemplateBuilderAPISerivce extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getEmailTemplatesByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/templatebuilder/emailtemplates/${formId}`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, emailTemplates: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async addTemplateConfig(emailTemplateId, body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/builder/templatebuilder/emailtemplates/${emailTemplateId}`,
                body,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { EmailTemplateBuilderAPISerivce };

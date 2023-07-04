import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class EmailTemplateApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    async getEmailTemplatesByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/templatebuilder/emailtemplates/${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, emailTemplates: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async sendEmail(emailtemplateid, selecetedNodes) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/builder/templatebuilder/email/${emailtemplateid}/sendemails`,
                selecetedNodes,
                { withCredentials: true }
            );

            if (data.success) {
                return {
                    success: true,
                    message: "send successfully",
                    data: data.data,
                };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { EmailTemplateApiService };

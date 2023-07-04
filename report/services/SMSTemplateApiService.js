import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class SMSTemplateApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getSMSTemplatesByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/templatebuilder/smstemplates/${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, smsTemplates: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async sendSMS(smstemplateid, selecetedNodes) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/smstemplate/${smstemplateid}/sendsms`,
                selecetedNodes,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, message: "send successfully" };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { SMSTemplateApiService };

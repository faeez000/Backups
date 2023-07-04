import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class SMSTemplateAPIService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getSMSTemplates() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/SmsTemplate/all`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, smsTemplates: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async getTemplate(smstemplateid) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/smstemplate/${smstemplateid}/gettemplate`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, smsTemplate: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }

    async addTemplate(body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/SmsTemplate/add`,
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

    async updateSMSTemplate(smsTemplate_id, smsTemplateDTO) {
        try {
            const { data } = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/SmsTemplate/update/${smsTemplate_id}`,
                smsTemplateDTO,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }

    async deleteSMSTemlpate(smsmtemplateid) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/settings/${smsmtemplateid}/Delete`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return {
                    success: true,
                    message: "template deleted successfully",
                };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { SMSTemplateAPIService };

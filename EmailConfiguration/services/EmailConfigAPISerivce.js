import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class EmailConfigAPISerivce extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getEmailTemplates() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/emailtemplate/all`,
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

    async getEmailTemplate(emailTemplateId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/emailtemplate/${emailTemplateId}/gettemplate`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, emailTemplate: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }

    async addEmailTemplate(body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/emailtemplate/add/Email`,
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

    async updateEmailTemplate(emailTemplateId, emailTemplateDTO) {
        try {
            const { data } = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/emailtemplate/${emailTemplateId}/update`,
                emailTemplateDTO,
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

    async deleteEmailTemlpate(emailTemplateId) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/settings/${emailTemplateId}/DeleteRecord`,
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

    async sendEmailTemplate(emailtemplateid, recordId, body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/builder/templatebuilder/emailtemplates/${recordId}/sendemail/${emailtemplateid}`,
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

    async getTemplateListForEmailType() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/templateListForEmailType`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, templateList: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async getEmailFormListForEmailType(templateId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/emailformlistforemailtype/${templateId}`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, formList: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async getColumnListForEmailTemplate(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/${formId}/columnlistforemailtemplate`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, columnList: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { EmailConfigAPISerivce };

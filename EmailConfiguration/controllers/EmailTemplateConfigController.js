import { showSuccessOrFailureMessage } from "../helpers/showSuccessOrFailureMessage";

class EmailTemplateConfigController {
    constructor(apiService) {
        this._apiService = apiService;
    }
    async getEmailTemplates() {
        const { success, emailTemplates, message } =
            await this._apiService.getEmailTemplates();
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return emailTemplates;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async getEmailTemplate(emailTemplateId) {
        const { success, emailTemplate, message } =
            await this._apiService.getEmailTemplate(emailTemplateId);
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return emailTemplate;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async addEmailTemplate(newTemplate) {
        const { success, message } = await this._apiService.addEmailTemplate(
            newTemplate
        );
        try {
            if (!success) return;
            return true;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailureMessage({ success, message });
        }
    }

    async updateEmailTemplate(emailTemplateId, emailTemplateDTO) {
        const { success, message } = await this._apiService.updateEmailTemplate(
            emailTemplateId,
            emailTemplateDTO
        );
        try {
            if (!success) return;
            return true;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailureMessage({ success, message });
        }
    }

    async deleteEmailTemlpate(emailTemplateId) {
        const { success, message } = await this._apiService.deleteEmailTemlpate(
            emailTemplateId
        );
        try {
            if (!success) return;
            return true;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailureMessage({ success, message });
        }
    }

    async getTemplateListForEmailType() {
        const { success, templateList, message } =
            await this._apiService.getTemplateListForEmailType();
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return templateList;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async getEmailFormListForEmailType(templateId) {
        const { success, formList, message } =
            await this._apiService.getEmailFormListForEmailType(templateId);
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return formList[0];
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async getColumnListForEmailTemplate(formId) {
        const { success, columnList, message } =
            await this._apiService.getColumnListForEmailTemplate(formId);
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return columnList;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }
}

export { EmailTemplateConfigController };

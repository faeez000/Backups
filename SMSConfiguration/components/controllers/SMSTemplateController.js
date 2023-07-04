import { showSuccessOrFailureMessage } from "../../helpers/showSuccessOrFailureMessage";

class SMSTemplateController {
    constructor(apiService) {
        this._apiService = apiService;
    }
    async getSMSTemplates() {
        const { success, smsTemplates, message } =
            await this._apiService.getSMSTemplates();
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return smsTemplates;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async getSMSTemplate(smsTemplateId) {
        const { success, smsTemplate, message } =
            await this._apiService.getTemplate(smsTemplateId);
        try {
            if (!success) {
                return showSuccessOrFailureMessage({ success, message });
            }
            return smsTemplate;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async addTemplate(newTemplate) {
        const { success, message } = await this._apiService.addTemplate(
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

    async updateSMSTemplate(smsTemplate_id, smsTemplateDTO) {
        const { success, message } = await this._apiService.updateSMSTemplate(
            smsTemplate_id,
            smsTemplateDTO
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

    async deleteSMSTemlpate(smsmTemplateId) {
        const { success, message } = await this._apiService.deleteSMSTemlpate(
            smsmTemplateId
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
}

export { SMSTemplateController };

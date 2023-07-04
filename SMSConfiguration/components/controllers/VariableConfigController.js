import { showSuccessOrFailureMessage } from "../../helpers/showSuccessOrFailureMessage";

class VariableConfigController {
    constructor(apiService) {
        this._apiService = apiService;
    }

    async getTemplateVariables(smsTemplateId) {
        const { success, variablesData, message } =
            await this._apiService.getTemplateVariables(smsTemplateId);
        try {
            if (!success)
                return showSuccessOrFailureMessage({ success, message });
            return variablesData;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async updateVariables(smsTemplateId, body) {
        const { success, message } = await this._apiService.updateVariables(
            smsTemplateId,
            body
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

    async addVariable(smsTemplateId, variableBody) {
        const { success, message } = await this._apiService.addVariable(
            smsTemplateId,
            variableBody
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

    async deleteVariable(smsTemplateId, variableId) {
        const { success, message } = await this._apiService.deleteVariable(
            smsTemplateId,
            variableId
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

export { VariableConfigController };

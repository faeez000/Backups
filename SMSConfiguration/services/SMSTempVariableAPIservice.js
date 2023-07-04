import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class SMSTempVariableAPIservice extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getTemplateVariables(smsTemplateId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/smstemplate/variables/${smsTemplateId}/all`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, variablesData: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async updateVariables(smsTemplateId, body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/smstemplate/variables/${smsTemplateId}/save`,
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

    async addVariable(smstemplateid, variableDTO) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/smstemplate/variables/${smstemplateid}/add`,
                variableDTO,
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

    async deleteVariable(smsmtemplateid, variableId) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/settings/smstemplate/variables/${smsmtemplateid}/${variableId}/Delete`,
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

export { SMSTempVariableAPIservice };

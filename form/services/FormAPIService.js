import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class FormAPIService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    /**
     *
     * @param {string} formId
     * @param {string} recordId
     */
    async getRecordByFormIdAndRecordId(formId, recordId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/simple/${formId}/records/${recordId}`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, record: data.data };
            }

            return { success: false, messages: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
    async getFormDetailByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/forms/${formId}`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, formDetails: data.data };
            }

            return { success: false, messages: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
    async saveForm(body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/simple/save`,
                body,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, messages: data.message };
            }

            return { success: false, messages: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async getGridRecordsByFormIdRecordId(formId, recordId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/Grid/${formId}/record/${recordId}`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, record: data.data };
            }

            return { success: false, messages: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async saveGridForm(body) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/gridform/save`,
                body,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, messages: data.message };
            }

            return { success: false, messages: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

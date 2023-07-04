import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class FormApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getFormDetails(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/forms/${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, formDetails: data.data };
            }
            return { success: false, message: data.message };
        } catch {
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
                return { success: true, record: data.data.mainElements[0] };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { FormApiService };

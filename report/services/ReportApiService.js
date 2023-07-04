import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class ReportApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getReport(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/report/${formId}/showRecords`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, report: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async deleteRowById(formId, recordIds) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/report/${formId}/multiple`,
                { data: recordIds },
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getColumnState() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/report/16/showRecords`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, columnsState: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async setColumnsSequence(formId, columnsSequence) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/report/setsequence/${formId}`,
                columnsSequence,
                {withCredentials: true}
            );
            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getColumnsByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/details/columns/byform?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, columns: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { ReportApiService };

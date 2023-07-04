import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class FormService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getTableList(reportId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/Report/${reportId}/Ledger/FormList`
            );
            if (data.success) {
                return { success: true, tables: data.data };
            }
            return { success: false, messages: data.message };
        } catch {
            return {
                success: false,
            };
        }
    }

    async getColumnList(formId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/Report/Ledger/Formlist/${formId}/Columns`
            );
            if (data.success) {
                return { success: true, columns: data.data };
            }
            return { success: false, messages: data.message };
        } catch {
            return {
                success: false,
            };
        }
    }
}

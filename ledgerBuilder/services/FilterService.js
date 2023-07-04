import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class FilterService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    async filterSetting(reportid, filter) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/report/ledger/${reportid}/ledgersetting`,
                filter
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    async getFilter(reportID) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/report/ledger/${reportID}/getFilter`
            );
            if (data.success) {
                return { success: true, filter: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }
}

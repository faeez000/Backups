import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class ReportService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getReportList() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/report/ledger`
            );
            if (data.success) {
                return { success: true, reports: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }
}

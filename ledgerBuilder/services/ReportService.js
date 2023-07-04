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

    async getReport(reportID) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/report/ledger/${reportID}/infoheader`
            );
            if (data.success) {
                return { success: true, report: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async deleteReport(reportID) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/report/ledger/${reportID}/delete`
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async save(report) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/report/ledger/save`,
                report
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    async update(reportid, reportName) {
        try {
            const { data } = await this.HTTP.put(
                `${this.baseURL}/api/admin/report/ledger/${reportid}/update`,
                reportName
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

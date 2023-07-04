import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class LedgerService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    async getHeaders(reportID) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/Report/Ledger/${reportID}/headerlist`
            );
            if (data.success) {
                return { success: true, headerlist: data.data.headerlist };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async createHeader(reportid, header) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/report/ledger/header/${reportid}/save`,
                header
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async deleteHeader(ReportId, Headerid) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/report/ledger/${ReportId}/Header/Delete?Headerid=${Headerid}`
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async getRows(reportID) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/report/ledger/${reportID}/rowdetails`
            );
            if (data.success) {
                return { success: true, rowList: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async getSelectedRow(reportID, rowId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/report/ledger/row/${reportID}/${rowId}/getrowdetails`
            );
            if (data.success) {
                return { success: true, row: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async createRow(reportid, row) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/report/ledger/row/${reportid}/save`,
                row
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async editRow(ReportId, report, RowId) {
        try {
            const { data } = await this.HTTP.put(
                `${this.baseURL}/api/admin/report/ledger/row/${ReportId}/${RowId}/update`,
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

    async deleteRow(ReportId, RowId) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/report/ledger/${ReportId}/row/delete?rowid=${RowId}`
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

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

    async getReportName(reportID) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/report/ledger/${reportID}/infoheader`
            );
            if (data.success) {
                return { success: true, reportname: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    // async getReportFilter(reportID) {
    //     try {
    //         // @ts-ignore
    //         const { data } = await this.HTTP.get(
    //             `${this.baseURL}/api/admin/report/ledger/${reportID}/getFilter`
    //         );
    //         if (data.success) {
    //             return { success: true, reportFilter: data.data };
    //         }
    //         return { success: false };
    //     } catch {
    //         return {
    //             success: false,
    //         };
    //     }
    // }

    async getFilterDetails(reportID) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/Report/Ledger/${reportID}/filterDetails`
            );
            if (data.success) {
                return { success: true, filterDetail: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async getReportData(reportID, report) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/user/Report/Ledger/${reportID}/ReportData`,
                report
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

    async getCompanyDetails() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/companyinfo/getcomapnydetails`
            );
            if (data.success) {
                return { success: true, company: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }
}

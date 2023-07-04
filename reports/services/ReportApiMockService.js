import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class ReportsApiMockServices extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
        this.data = {
            forms: [
                {
                    form_id: "b78a1760-bdef-464a-a8d7-2dfcd35000b7",
                    form_name: "Add Customer To My Shop",
                },
                {
                    form_id: "100",
                    form_name: "Agreement",
                },
                {
                    form_id: "d5e39ff7-11a6-45ba-aa50-4ce2076e00b5",
                    form_name: "A-Grid",
                },
                {
                    form_id: "88",
                    form_name: "Annual Report",
                },
                {
                    form_id: "124",
                    form_name: "Application",
                },
            ],
        };
    }

    async getReports() {
        try {
            const data = { success: true, data: this.data.forms };
            if (data.success) {
                return { success: true, forms: data.data };
            }
            data.message = "Reports not found";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { ReportsApiMockServices };

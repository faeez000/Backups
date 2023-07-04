import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class ReportsApiServices extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getReports() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/forms/properties`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, forms: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getFormCategories() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/pagebuilder/categories`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, categories: data.data };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { ReportsApiServices };

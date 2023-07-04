import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class FormsAPIService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getForms() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/forms/getFormListContainTelElement`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, forms: data.data };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }
}

export { FormsAPIService };

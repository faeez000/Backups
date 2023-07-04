import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class FormApiMockService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getFormDetails(formId) {
        try {
            const data = { success: true, data: { name: "some form name" } };
            if (data.success) {
                return { success: true, formDetails: data.data };
            }
            console.log("error something wrong");
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { FormApiMockService };

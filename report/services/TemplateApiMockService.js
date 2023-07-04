import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class TemplateApiMockService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
        this.data = {
            templates: [
                { name: "salarySlip", id: "1323542-sdssd-1212" },
                { name: "offerLater", id: "1323542-qwqw-4545" },
            ],
        };
    }
    async getTemplatesByFormId(formId) {
        try {
            const data = { success: true, data: this.data.templates };
            if (data.success) {
                return { success: true, templates: data.data };
            }
            data.message = "templates not found";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { TemplateApiMockService };

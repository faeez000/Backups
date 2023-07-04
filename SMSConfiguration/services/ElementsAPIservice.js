import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class ElementsAPIservice extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getElementsByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/Report/Ledger/Formlist/${formId}/Columns`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, elements: data.data };
            }

            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getElementsByFormIdFromBuilder(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/element-builder/elements?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, elements: data.data };
            }

            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getElementsWithTeleByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/forms/${formId}/getElementListContainTelElement`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, elements: data.data };
            }

            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { ElementsAPIservice };

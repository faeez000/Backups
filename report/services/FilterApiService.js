import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class FilterApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }
    async getFilterItems(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/Report/filter/Show?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, filterItems: data.data.filterItems };
            }
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async addFilterItem(filterItem) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/Report/filter/add`,
                filterItem,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, message: data.message };
            }

            return { success: false, message: data.message };
        } catch (error) {
            return this.handleAPIError();
        }
    }

    async deleteFilterItem(formId, filterItemKey) {
        try {
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/Report/filter/Delete/${formId}/${filterItemKey}`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, message: data.message };
            }

            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { FilterApiService };

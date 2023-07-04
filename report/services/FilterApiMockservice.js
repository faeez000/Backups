import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class FilterApiMockService extends BaseAPIService {
    constructor() {
        super();
        this.data = {
            filterItems: [],
        };
    }
    getFilterItems() {
        try {
            const data = { success: true, data: [...this.data.filterItems] };
            if (data.success) {
                return { success: true, filterItems: data.data };
            }
            data.message = "Filters Not Available";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
    addFilterItem(filterItem) {
        try {
            console.log("filter item true", true, filterItem);
            const data = {
                success: true,
                filterItem: filterItem,
                message: "Filter Added",
            };
            if (data.success) {
                this.data.filterItems.push(filterItem);
                return { success: true, message: data.message };
            }
            data.message = "Add Filter Failed";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    deleteFilterItem(formId, filterItemKey) {
        try {
            const data = { success: true, message: "Filter deleted" };
            if (data.success) {
                this.data.filterItems = this.data.filterItems.filter(
                    (filterItem) => filterItem.filterName !== filterItemKey
                );
                return { success: true, message: data.message };
            }
            data.message = "Delete filter failed";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

export { FilterApiMockService };

import { showSuccessOrFailure } from "../modules/showSuccessOrFailure";

class FilterController {
    constructor(apiService) {
        this._apiService = apiService;
    }
    async getFilterItems(formId) {
        const { success, filterItems, message } =
            await this._apiService.getFilterItems(formId);
        try {
            if (!success) return;
            return filterItems;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async addFilterItem(filterItem) {
        const { success, message } = await this._apiService.addFilterItem(
            filterItem
        );
        try {
            if (!success) {
                console.log("error : something went wrong" + message);
            }
            return success;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async deleteFilterItem(formId, filterItemKey) {
        const { success, message } = await this._apiService.deleteFilterItem(
            formId,
            filterItemKey
        );
        try {
            if (!success) {
                console.log("error : something went wrong" + message);
            }
            return success;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }
}

export { FilterController };

import { showSuccessOrFailureMessage } from "../../helpers/showSuccessOrFailureMessage";

class ElementsController {
    constructor(apiService) {
        this._apiService = apiService;
    }

    async getElementsByFormIdFromBuilder(formId) {
        const { success, elements, message } =
            await this._apiService.getElementsByFormIdFromBuilder(formId);
        try {
            if (!success)
                return showSuccessOrFailureMessage({ success, message });
            return elements;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async getElementsWithTeleByFormId(formId) {
        const { success, elements, message } =
            await this._apiService.getElementsWithTeleByFormId(formId);
        try {
            if (!success)
                return showSuccessOrFailureMessage({ success, message });
            return elements;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }
    getElementsWithTeleByFormId;
}

export { ElementsController };

import { showSuccessOrFailureMessage } from "../../helpers/showSuccessOrFailureMessage";

class FormController {
    constructor(apiService) {
        this._apiService = apiService;
    }
    async getForms(formId) {
        const { success, forms, message } = await this._apiService.getForms(
            formId
        );
        try {
            if (!success)
                return showSuccessOrFailureMessage({ success, message });
            return forms;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }
}

export { FormController };

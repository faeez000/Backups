import { AXIOS_INSTANCE } from "../../../Global.js";

export default class PrintPreviewService {
    constructor(baseUrl, templateId, type, entryId, formName) {
        this.baseUrl = baseUrl;
        this.templateId = templateId;
        this.type = type;
        this.entryId = entryId;
        this.formName = formName;
    }
    async getTemplate() {
        try {
            const response = await AXIOS_INSTANCE(
                `${this.baseUrl}/template/${this.templateId}?type=${this.type}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    async getFormDetailAsParameter() {
        try {
            const response = await AXIOS_INSTANCE(
                `${this.baseUrl}/formdetail?form_name=${this.formName}&entry_id=${this.entryId}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

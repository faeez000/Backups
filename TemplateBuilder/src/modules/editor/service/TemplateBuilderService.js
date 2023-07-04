import { AXIOS_INSTANCE } from "../../../Global.js";
import { scratchpad, variableList } from "../index.js";
import { variableService } from "./index.js";

export default class TemplateBuilderService {
    /**
     *
     * @param {string} baseUrl
     * @param {string} templateId
     * @param {string} type
     */
    constructor(baseUrl, templateId, type) {
        this.baseUrl = baseUrl;
        this.templateId = templateId;
        this.type = type;
    }
    async save(data) {
        try {
            //@ts-ignore
            const response = await AXIOS_INSTANCE.post(
                `${this.baseUrl}/template?type=${this.type}`,
                {},
                { withCredentials: true }
            );
            return { success: true };
        } catch (error) {}
    }
    async updateContent(data) {
        try {
            //@ts-ignore
            const response = await AXIOS_INSTANCE.put(
                `${this.baseUrl}/template/${this.templateId}/content?type=${this.type}`,
                {
                    template_content: data,
                },
                { withCredentials: true }
            );
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: "Failed to update" };
        }
    }
    async getEditorData() {
        try {
            //@ts-ignore
            const response = await AXIOS_INSTANCE(
                `${this.baseUrl}/template/${this.templateId}?type=${this.type}`,
                { withCredentials: true }
            );
            const { variables } = await variableService.getTemplateVariables();
            if (response.data.success) {
                const { template_parameter, form_name } = response.data.data;

                variableList.update(variables);
                scratchpad.update(template_parameter);
                scratchpad.updateFormName(form_name);

                return { success: true, data: response.data.data };
            }
            return { success: false, data: null };
        } catch (error) {
            return { success: false, data: null };
        }
    }
}

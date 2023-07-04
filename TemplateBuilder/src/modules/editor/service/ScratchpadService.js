import { AXIOS_INSTANCE } from "../../../Global.js";
import { scratchpad } from "../index.js";

export default class ScratchpadService {
    /**
     *
     * @param {string} baseURL
     * @param {string} templateId
     * @param {string} type
     */
    constructor(baseURL, templateId, type) {
        this.baseURL = baseURL;
        this.templateId = templateId;
        this.type = type;
    }

    async save(content = "") {
        try {
            // @ts-ignore
            const response = await AXIOS_INSTANCE.put(
                `${this.baseURL}/template/${this.templateId}/parameter?type=${this.type}`,
                { template_parameter: content },
                { withCredentials: true }
            );
            if (response.data.success) {
                scratchpad.update(content);
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch {
            return { success: false };
        }
    }
    async getParameters() {
        return scratchpad.getContent();
    }
    async getFormName() {
        return scratchpad.getFormName();
    }
}

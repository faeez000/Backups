import { AXIOS_INSTANCE } from "../Global.js";

export default class TemplateSettingService {
    constructor(baseUrl, type) {
        this.baseUrl = baseUrl;
        this.type = type;
    }
    async getTemplates() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseUrl}/templates?type=${this.type}`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, templates: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    async save(template) {
        try {
            // @ts-ignore
            const response = await AXIOS_INSTANCE.post(
                `${this.baseUrl}/${this.type}?type=${this.type}`,
                template,
                { withCredentials: true }
            );

            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: "Failed to save" };
        }
    }
    async update(id, value) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseUrl}/template/${id}/name?type=${this.type}`,
                {
                    template_name: value,
                },
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: "Oops Something went wrong!" };
        }
    }
    async remove(id) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseUrl}/template/${id}?type=${this.type}`,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: "Oops Something went wrong!" };
        }
    }
    async exist(name) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseUrl}/template/exist?template_name=${name}?type=${this.type}`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, exist: data.success };
            }
            return { success: false, exist: data.success };
        } catch (error) {
            return { success: false };
        }
    }
    async getTemplateLayouts() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseUrl}/templates?type=layout`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, layouts: data.data };
            }
            return { success: false, layouts: [] };
        } catch (error) {
            return { success: false, layouts: [] };
        }
    }
    /**
     *
     * @param {string} templateId
     */
    async getTemplateContentByTemplateId(templateId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseUrl}/template/${templateId}/content`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, content: data.data };
            }
            return { success: false, content: "" };
        } catch (error) {
            return { success: false, content: "" };
        }
    }
    async getFormList() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseUrl}/formlist?type=template`,
                { withCredentials: true }
            );
            if (data.success) {
                return { success: true, formList: data.data };
            }
            return { success: false, formList: [] };
        } catch (error) {
            return { success: false, formList: [] };
        }
    }
}

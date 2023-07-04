import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class PrintLayoutService extends BaseAPIService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        super(baseURL);
    }

    async create(template) {
        try {
            // @ts-ignore
            const response = await this.HTTP.post(
                `${this.baseURL}/api/builder/templatebuilder/template?type=template`,
                template,
                { withCredentials: true }
            );

            if (response.data.success) {
                return { success: true, messages: response.data.message };
            }
            return { success: false, messages: response.data.message };
        } catch (error) {
            return { success: false, messages: "Failed to save" };
        }
    }
    async createLayoutWitTemplate(template, templateId) {
        try {
            // @ts-ignore
            const response = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/PrintLayout/CreateTemplate?template_id=${templateId}&type=template`,
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

    async getFormList() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/templatebuilder/formlist?type=template`,
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

    async getTemplateLayouts() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/templatebuilder/templates?type=layout`,
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
}

import { variableList } from "../index.js";
import Variable from "../../../domain/ValueObject/Variable.js";
import { AXIOS_INSTANCE } from "../../../Global.js";

export default class VariableService {
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
    async save({ variable_name, variable_query }) {
        try {
            const variable = new Variable(
                variable_name,
                variable_query,
                this.templateId
            );
            // @ts-ignore
            const response = await AXIOS_INSTANCE.post(
                `${this.baseURL}/variable?type=${this.type}`,
                variable,
                { withCredentials: true }
            );
            if (response.data.success) {
                variableList.add(variable);
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false };
        }
    }
    async exist(name) {
        try {
            // @ts-ignore
            const response = await AXIOS_INSTANCE(
                `${this.baseURL}/variable/${this.templateId}?variable_name=${name}&type=${this.type}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                return { success: true, message: `"${name}" Already Exist` };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    async getVariables() {
        try {
            return { success: true, variables: variableList.get() };
        } catch (error) {
            return { success: false, variables: [] };
        }
    }
    async getTemplateVariables() {
        try {
            // @ts-ignore
            const response = await AXIOS_INSTANCE(
                `${this.baseURL}/variables/${this.templateId}?type=${this.type}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                const variables = response.data.data;
                variableList.update(variables);
                return { success: true, variables };
            }
            return { success: false, variables: [] };
        } catch (error) {
            return { success: false, variables: [] };
        }
    }
    async updateVariables(data = []) {
        try {
            const variables = [];
            data.forEach(([key, value]) => {
                variables.push({
                    variable_name: key,
                    variable_query: value,
                    template_id: this.templateId,
                });
            });
            // @ts-ignore
            const response = await AXIOS_INSTANCE.put(
                `${this.baseURL}/variable/${this.templateId}?type=${this.type}`,
                variables,
                { withCredentials: true }
            );
            if (response.data.success) {
                variableList.update(variables);
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false };
        }
    }
    async deleteVariables(variables = []) {
        try {
            // @ts-ignore
            const response = await AXIOS_INSTANCE.post(
                `${this.baseURL}/variable/${this.templateId}?type=${this.type}`,
                variables,
                { withCredentials: true }
            );
            if (response.data.success) {
                variableList.deleteVariables(variables);
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

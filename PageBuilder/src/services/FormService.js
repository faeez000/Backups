import CloneFormModel from "../domain/CloneFormModel.js";
import FormModel from "../domain/FormModel.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class FormService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    /**
     *
     * @returns {Promise<object>}
     */
    async getForms() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/forms/properties`,
                {
                    withCredentials: true,
                }
            );

            return { success: true, forms: data.data };
        } catch (error) {
            return { success: false };
        }
    }

    async exportForm(formId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/admin/Export/${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return {
                    success: true,
                    formdata: data.data,
                };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async importForm(form) {
        try {
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/admin/Import`,
                form,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {FormModel} form
     * @returns {Promise<object>}
     */
    async createNew(form) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/pagebuilder/form`,
                form,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {FormModel} form
     * @param {string} oldFormName
     * @returns {Promise<object>}
     */
    async update(form, oldFormName) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/api/pagebuilder/form?oldFormName=${oldFormName}`,
                form,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} formId
     * @param {string} formName
     * @returns {Promise<object>}
     */
    async deleteFormBy(formId, formName) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/api/pagebuilder/form?formId=${formId}&formName=${encodeURIComponent(
                    formName
                )}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     * @param {CloneFormModel} form
     */
    async cloneForm(form) {
        try {
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/admin/settings/CloneForm/add`,
                form,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

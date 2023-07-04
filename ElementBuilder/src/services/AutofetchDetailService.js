import AutofetchDetail from "../domain/core/Entity/AutofetchDetail.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class AutofetchDetailService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {AutofetchDetail}
         */
        this.autofetchDetail = null;
    }
    /**
     *
     * @param {string} formId
     */
    async getAutofetchDetailsBy(formId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/details?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, details: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {AutofetchDetail} autofetchDetail
     */
    async saveAutofetchDetail(autofetchDetail) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/detail`,
                autofetchDetail,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.autofetchDetail = null;
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {string} elementId
     */
    async getAutofetchDetailBy(elementId = null) {
        try {
            // if (!!this.autofetchDetail) {
            //     return { success: true, detail: this.autofetchDetail };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/detail/${elementId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.autofetchDetail = data.data;
                return { success: true, detail: this.autofetchDetail };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
}

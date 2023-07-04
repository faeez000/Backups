import OptionDetail from "../domain/core/Entity/OptionDetail.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class OptionDetailService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {OptionDetail}
         */
        this.optionDetail = null;
    }
    /**
     *
     * @param {OptionDetail} optionDetail
     */
    async saveOptionDetail(optionDetail) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/detail`,
                optionDetail,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.optionDetail = null;
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
     * @param {string} formId
     */
    async getOptionDetailBy(elementId = null, formId = null) {
        try {
            // if (!!this.optionDetail) {
            //     return { success: true, detail: this.optionDetail };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/detail?elementId=${elementId}&formId=${formId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.optionDetail = data.data;
                return { success: true, detail: this.optionDetail };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
}

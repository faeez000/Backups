import AutoSuggestionDetail from "../domain/core/Entity/AutoSuggestionDetail.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class AutoSuggestionDetailService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {AutoSuggestionDetail}
         */
        this.autoSuggestionDetail = null;
    }
    /**
     *
     * @param {AutoSuggestionDetail} autoSuggestionDetail
     */
    async saveAutoSuggestionDetail(autoSuggestionDetail) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/detail`,
                autoSuggestionDetail,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.autoSuggestionDetail = null;
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
    async getAutoSuggestionDetailBy(elementId = null, formId = null) {
        try {
            if (!!this.autoSuggestionDetail) {
                return { success: true, detail: this.autoSuggestionDetail };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/detail?elementId=${elementId}&formId=${formId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.autoSuggestionDetail = data.data;
                return { success: true, detail: this.autoSuggestionDetail };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
}

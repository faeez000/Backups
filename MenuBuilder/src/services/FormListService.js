import { AXIOS_INSTANCE } from "../Global.js";

export default class FormListSerivce {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getFormList() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(`${this.baseURL}/api/forms`, {
                withCredentials: true,
            });

            if (data.success) {
                return { success: true, forms: data.data };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }
}

import { AXIOS_INSTANCE } from "../Global.js";

export default class PageListService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getPageList() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/pages/metadata`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, pages: data.data };
            }
        } catch {
            return {
                success: false,
            };
        }
    }
}

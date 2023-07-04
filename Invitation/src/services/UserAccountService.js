import { AXIOS_INSTANCE } from "../Global.js";

export default class UserAccountService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getMyAccount() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/admin/settings/myaccount`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, account: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
}

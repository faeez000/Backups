import { AXIOS_INSTANCE } from "../Global.js";

export default class UserApiSerivce {
    constructor(baseUrl, type) {
        this.baseUrl = baseUrl;
        this.type = type;
    }
    async getUserAccount() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseUrl}/api/admin/settings/myaccount`,
                { withCredentials: true }
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

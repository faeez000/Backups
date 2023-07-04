import { AXIOS_INSTANCE } from "../Global.js";

export default class LedgerListService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getLedgerList() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/admin/report/ledger`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, ledger: data.data };
            }
        } catch {
            return {
                success: false,
            };
        }
    }
}

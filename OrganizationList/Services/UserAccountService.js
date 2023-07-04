import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class UserAccountService extends BaseAPIService{
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        // this.baseURL = baseURL;
        super(baseURL);
    }
    async getMyAccount() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
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

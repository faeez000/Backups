import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class OnChangeQueryApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    /**
     *
     * @param {string} formId
     * @param {string} section
     * @returns
     */
    async getOnChangeQueryValues(formId, onChangeQueryDTO) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/user/form/${formId}/property/getonchangevalue`,
                onChangeQueryDTO,
                { withCredentials: true }
            );

            if (data.success) {
                return { success: true, valueChangedElements: data.data };
            }

            return { success: false, messages: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}

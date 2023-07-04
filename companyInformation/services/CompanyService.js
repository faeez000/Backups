import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class CompanyService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    /**
     * @returns {object}
     */
    async getCompanyDetails() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/companyinfo/getcomapnydetails`
            );
            if (data.success) {
                this.users = data.data;
                return { success: true, company: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    async updatedCompanyDetails(companyDetail) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/user/companyinfo/savecomapnyinfo`,
                companyDetail
            );
            if (data.success) {
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

export { CompanyService };

// import { AXIOS_INSTANCE } from "../Global.js";
import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class OrganizationSwitchService extends BaseAPIService{
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        // this.baseURL = baseURL;
        super(baseURL);
        this.organizationsnames = [];
        
    }

    /**
     * @returns {object}
     */
    async showAllOrganizationsByUserId() {
      
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/organizationselection/showallorganizationsbyuserid`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                
                this.organizationsnames = data.data;
                return { success: true, organizationsnames: data.data };
            }
            return { success: false , message: data.message};
        } catch (error) {
            this.handleAPIError();
        }
    }

    /**
     *
     *
     * @param {string} organizationId
     */
    async checkIsAdmin(organizationId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/organizationselection/checkisadminbyuserid/${organizationId}`,

                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, isAdmin: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }
    /**
     *
     *
     * @param {string} organizationId
     */
    async updateRecentOrganization(organizationId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.put(
                `${this.baseURL}/api/organizationSelection/updateRecentAccessedOrganization/${organizationId}`,
                null,

                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.organizations = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }

    /**
     *
     *
     */

    async getOrganizationDetailsById() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/organizationsetting/organization/getOrganizationDetailsById`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.organizationinfo = data.data;
                return { success: true, organizationinfo: data.data };
            }
            return { success: false };
        } catch (error) {
            this.handleAPIError();
        }
    }
    /**
     *
     * @param {string} organizationId
     */

    async getOrganizationDetailsByOrganizationId(organizationId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/organization/getOrganizationDetailsByOrganizationId/${organizationId}`,
                null,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.organizationdetails = [];
                
                return { success: true, organizationdetails: data.data };
            }
            return { success: false };
        } catch (error) {
            this.handleAPIError();
        }
    }

    /**
     *
     * @param {OrganizationModel} organization
     * @returns {object}
     */
    async create(organization) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/organizationSelection/createOrganization`,
                organization,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.organization = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }
    /**
  //    *
  //    * @param {OrganizationModel} organization
  //    * @returns {object}
  //    */

    async update(organization) {
        try {
            
            // @ts-ignore
            const { data } = await this.HTTP.put(
                `${this.baseURL}/api/organizationsetting/organization/updateOrganizationInfo`,
                organization,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
           
                this.organization = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }

    /**
     *
     * @param {string} organizationId
     * @returns {object}
     */
    async deleteBy(organizationId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.delete(
                // `${this.baseURL}/api/organizationsetting/deleteuser?userId=${userId}`,
                `${this.baseURL}/api/organization/deleteOrganization/${organizationId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.users = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            this.handleAPIError();
        }
    }
}

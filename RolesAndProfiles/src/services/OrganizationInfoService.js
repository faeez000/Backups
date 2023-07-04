import { AXIOS_INSTANCE } from "../Global.js";

export default class OrganizationService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.organizations = [];
    }

    /**
     *
     *
     */

    async getOrganizationDetailsById() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/organization/getOrganizationDetailsById`,
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
            return { success: false };
        }
    }

    async update(organization) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/organizationsetting/updateuser`,
                users,
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
            return { success: false };
        }
    }
    //   /**
    //    *
    //    * @param {UserModel} users
    //    */
    //   async create(users) {
    //     try {
    //       // @ts-ignore
    //       const { data } = await AXIOS_INSTANCE.post(
    //         `${this.baseURL}/organizationsetting/adduser`,
    //         users,
    //         {
    //           withCredentials: true,
    //         }
    //       );
    //       if (data.success) {
    //         this.users = [];
    //         return { success: true };
    //       }
    //       return { success: false, message: data.message };
    //     } catch (error) {
    //       return { success: false };
    //     }
    //   }

    //   /**
    //    *
    //    * @param {UserModel} users
    //    * @returns {object}
    //    */

    //   /**
    //    *
    //    * @param {string} userId
    //    * @returns {object}
    //    */
    //   async deleteBy(userId) {
    //     try {
    //       // @ts-ignore
    //       const { data } = await AXIOS_INSTANCE.delete(
    //         `${this.baseURL}/organizationsetting/deleteuser?userId=${userId}`,
    //         {
    //           withCredentials: true,
    //         }
    //       );
    //       if (data.success) {
    //         this.users = [];
    //         return { success: true };
    //       }
    //       return { success: false, message: data.message };
    //     } catch (error) {
    //       return { success: false };
    //     }
    //   }
}

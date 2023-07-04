import ProfileModel from "../domain/ProfileModel.js";
import RoleModel from "../domain/ProfileModel.js";
import UserModel from "../domain/ProfileModel.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class CommonService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.profilesnames = [];
        this.rightsnames = [];
        this.usersnames = [];
        this.rolesnames = [];
    }

    /**
     * @returns {object}
     */
    async getprofilesnames() {
        try {
            // if (this.rightsnames.length > 0) {
            //     return { success: true, rightsnames: this.rightsnames };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/common/getprofilesnames`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.profilesnames = data.data;
                return { success: true, profilesnames: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     * @returns {object}
     */
    async getrightsnames() {
        try {
            // if (this.rightsnames.length > 0) {
            //     return { success: true, rightsnames: this.rightsnames };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/common/getrightsnames`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rightsnames = data.data;
                return { success: true, rightsnames: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     * @returns {object}
     */
    async getrolesnames() {
        try {
            // if (this.rightsnames.length > 0) {
            //     return { success: true, rightsnames: this.rightsnames };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/common/getrolesnames`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rolesnames = data.data;
                return { success: true, rolesnames: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
}

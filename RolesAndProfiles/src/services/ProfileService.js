import { AXIOS_INSTANCE } from "../Global.js";

import ProfileModel from "../domain/ProfileModel.js";

export default class ProfileService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.profiles = [];
        this.rightsnames = [];
    }

    /**
     * @returns {object}
     */
    async getProfiles() {
        try {
            if (this.profiles.length > 0) {
                return { success: true, profiles: this.profiles };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/showallprofile`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.profiles = data.data;
                return { success: true, profiles: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    async getMobileLandingPage() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/formlist/bytype?type=Mobile`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.formNames = data.data;
                return { success: true, formNames: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {string} profileId
     * @returns {object}
     */

    async getProfileDetailsById(profileId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.get(
                `${this.baseURL}/organizationsetting/getprofiledetailsbyid?profile_id=${profileId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.profiles = [];
                return { success: true, profileDetails: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {ProfileModel} profile
     */
    async create(profile) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/organizationsetting/addprofile`,
                profile,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.profiles = [];
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {ProfileModel} profiles
     * @returns {object}
     */
    async update(profiles) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/organizationsetting/updateprofile`,
                profiles,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.profiles = [];
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} profileId
     * @returns {object}
     */
    async deleteBy(profileId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/organizationsetting/deleteprofile?profileId=${profileId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.profiles = [];
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

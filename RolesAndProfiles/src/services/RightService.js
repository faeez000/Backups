import RightModel from "../domain/RightModel.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class RightService {
    /**
     *
     * @param {string} baseURL
     */

    constructor(baseURL) {
        this.baseURL = baseURL;
        this.rights = [];
        this.rightsnames = [];
    }

    /**
     * @returns {object}
     */
    async getRights() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/showallrights`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rights = data.data;
                return { success: true, rights: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {string} rightsId
     * @returns {object}
     */

    async getRightsDetailsById(rightsId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.get(
                `${this.baseURL}/organizationsetting/getrightdetailsbyid?rights_id=${rightsId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rights = [];
                return { success: true, rightDetails: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {RightModel} right
     */
    // async save(right) {
    //     try {
    //         // @ts-ignore
    //         const { data } = await AXIOS_INSTANCE.post(
    //             `${this.baseURL}/organizationsetting/saveRight`,
    //             right,
    //             {
    //                 withCredentials: true,
    //             }
    //         );
    //         if (data.success) {
    //             this.rights = [];
    //             return { success: true };
    //         }
    //         return { success: false, message: data.message };
    //     } catch (error) {
    //         return { success: false };
    //     }
    // }

    async add(rightName, rightId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/organizationsetting/userrights/add?rights_id=${rightId}&rights_name=${rightName}`,

                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rights = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {RightModel} right
     */
    async update(right) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/organizationsetting/updateRight`,
                right,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rights = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async updateRightName(rightName, rightId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/organizationsetting/userright/rename/${rightId}?rights_name=${rightName}`,

                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rights = [];
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {string} rightId
     * @returns {object}
     */
    async deleteBy(rightId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/organizationsetting/deleteright?rights_id=${rightId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.rights = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     * @returns {object}
     */
    async getformsnames() {
        try {
            // if (this.rightsnames.length > 0) {
            //     return { success: true, rightsnames: this.rightsnames };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/rights/getformsnames`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.formsnames = data.data;
                return { success: true, formsnames: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
}

import UserModel from "../domain/UserModel.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class UserService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.users = [];
    }

    /**
     * @returns {object}
     */
    async getUsers() {
        try {
            // if (this.users.length > 0) {
            //     return { success: true, users: this.users };
            // }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/showalluser`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.users = data.data;
                return { success: true, users: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {string} userId
     * @returns {object}
     */

    async getUserDetailsById(userId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.get(
                `${this.baseURL}/organizationsetting/getuserdetailsbyid?id=${userId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.users = [];
                return { success: true, usersDetails: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {UserModel} users
     */
    async create(users) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/organizationsetting/adduser`,
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
    /**
     *
     * @param {UserModel} users
     * @returns {object}
     */
    async update(users) {
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
    /**
     *
     * @param {string} userId
     * @returns {object}
     */
    async deleteBy(userId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/organizationsetting/deleteuser?id=${userId}`,
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
}

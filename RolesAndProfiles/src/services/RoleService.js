import RoleModel from "../domain/RoleModel.js";
//import FormModel from "../domain/UserModel.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class RoleService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.roles = [];
    }

    /**
      // @ts-ignore
     * @returns {object}
     */
    async getRoles() {
        try {
            if (this.roles.length > 0) {
                return { success: true, roles: this.roles };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/organizationsetting/showallrole`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.roles = data.data;
                return { success: true, roles: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {string} roleId
     * @returns {object}
     */

    async getRoleDetailsById(roleId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.get(
                `${this.baseURL}/organizationsetting/showrolebyid?role_id=${roleId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.roles = [];
                return { success: true, roleDetails: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    /**
     *
     * @param {RoleModel} roles
     */
    async create(roles) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/organizationsetting/addrole`,
                roles,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.roles = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {RoleModel} roles
     * @returns {object}
     */
    async update(roles) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/organizationsetting/updaterole`,
                roles,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.roles = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} roleId
     * @returns {object}
     */
    async deleteBy(roleId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/organizationsetting/deleterole?roleId=${roleId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.roles = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

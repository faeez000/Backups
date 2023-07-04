import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class UserService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    /**
     * @returns {object}
     */
    async getUsers() {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/user-rights/userlist`,
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

    async getFilteredUser(userId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/user-rights/${userId}/userlist`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.users = data.data;
                return { success: true, usersList: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    async getSelectedUsers(id) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user-rights/childuser/${id}`,
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
     * @param {UserModel} users
     */
    async addUser(users) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/admin/user-rights/manageaccess/add`,
                users,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.users = [];
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} userId
     * @returns {object}
     */
    async deleteBy(userId, downUserId) {
        try {
            // @ts-ignore
            const { data } = await this.HTTP.delete(
                `${this.baseURL}/api/admin/user-rights/manageaccess/delete?userid=${userId}&downuser_id=${downUserId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.users = [];
                return { success: true, messages: data.message };
            }
            return { success: false, messages: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

export { UserService };

import { AXIOS_INSTANCE } from "../Global.js";

export default class InvitationService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getInvitationById(id) {
        try {
            const { data } = await AXIOS_INSTANCE.get(
                `${this.baseURL}/api/invitations/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return {
                    invitation: data.data,
                    success: data.success,
                    message: data.message,
                };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async acceptInvitation(id) {
        try {
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/invitations/${id}/accept`,
                null,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return {
                    success: true,
                    message: data.message,
                };
            }
            return { success: false, message: data.message };
        } catch {
            return { success: false };
        }
    }
}

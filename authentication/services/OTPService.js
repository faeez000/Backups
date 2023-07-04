import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class OTPService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    async sendOTP(phone) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/sendotp/${phone}`
            );
            if (data.data.type == "success") {
                return { success: true };
            }
            return { success: false };
        } catch {
            return {
                success: false,
            };
        }
    }

    async reSendOTP(phone) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/resendotp/${phone}`
            );
            if (data.data.type == "success") {
                return { success: true, messages: data.data.message };
            }
            return { success: false, messages: data.data.message };
        } catch {
            return { success: false };
        }
    }

    async verifyOTP(phone, otp) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/user/verifyotp/${phone}/${otp}`
            );
            if (data.data.type == "success") {
                return { success: true, messages: data.data.message };
            }
            return { success: false, messages: data.data.message };
        } catch {
            return {
                success: false,
            };
        }
    }
}

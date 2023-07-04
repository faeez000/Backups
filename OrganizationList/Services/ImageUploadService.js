import { AXIOS_INSTANCE } from "../Global.js";

export default class ImageUploadService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    /**
     *
     * @param {FormData} file
     */
    async upload(formData) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, url: data.data };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

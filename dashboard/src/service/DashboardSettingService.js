import { AXIOS_INSTANCE } from "../utils/Global.js";


export default class DashboardSettingService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async fetch() {
        try {
            const response = await AXIOS_INSTANCE(`${this.baseUrl}/dashboards`, {
                withCredentials : true
            });
            if (response.data.success) {
                return { success: true, items: response.data.data };
            }
            return { success: false, message: "Failed to load" };
        } catch (error) {
            return { success: false, message: "Failed to load" };
        }
    }
    async save(dashboard_id, dashboard_name) {
        try {
            const response = await AXIOS_INSTANCE.post(`${this.baseUrl}/dashboard `,{
                dashboard_name,
                dashboard_id},
                {
                withCredentials : true
            });
          
            if (response.data.success) {
                return { success: true, message: response.data.message };

            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: response.data.message };
        }
    }
    async update(id, value) {
        try {
            const response = await AXIOS_INSTANCE.put(`${this.baseUrl}/dashboard`, {
                dashboard_id: id,
                dashboard_name: value,
            },{
                withCredentials:true
            });

            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: response.data.message };
        }
    }
    async remove(id) {
        try {
            const response = await AXIOS_INSTANCE.delete(
                `${this.baseUrl}/dashboard/${id}`,{
                    withCredentials:true
                }
            );

            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return { success: false, message: response.data.message };
        }
    }
    async exist(name) {
        try {
            const response = await AXIOS_INSTANCE.post(
                `${this.baseUrl}/dashboard/${name}`,
                {
                    dashboard_name: name,
                },{
                    withCredentials:true
                }
            );
            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message,
                    exist: response.data.success,
                };
            }
            return {
                success: false,
                message: response.data.message,
                exist: response.data.data,
            };
        } catch (error) {
            return { success: false, message: response.data.message };
        }
    }
}

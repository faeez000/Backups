import { AXIOS_INSTANCE } from "../utils/Global.js";

export default class DashboardQueryService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async fetchTableWidget(query) {
        const url = `${this.baseUrl}/numbers`
        try {
            const { data} = await AXIOS_INSTANCE.post(url,
                    query,
                   {
                    withCredentials : true,
                    }
                     );
                    if (data.success) {
                        return { success: true, data };
                    }
                    return{success:false};

                } catch (error) {
                    return { success: false };
            }
    }


    async fetchTableReport(query) {
        try {
            const {data } = await AXIOS_INSTANCE.post(`${this.baseUrl}/list`,
                
                    query,
                {
                    withCredentials:true
                }
            );
            if (data.success) {
                return { success: true, data: data.data };
            }
            return {success:false}

        } catch (error) {
            return { success: false };
        }
    }

    async fetchTableChart(query){
        try {
            const { data} = await AXIOS_INSTANCE.post(`${this.baseUrl}/chart`,
                
                    query,
                {
                    withCredentials:true
                }
            );
            if (data.success) {
                return { success: true, data: data.data };
            }

            return {success:false}
        } catch (error) {
            return { success: false };
        }
    }

}

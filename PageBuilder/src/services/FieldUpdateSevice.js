import { AXIOS_INSTANCE } from "../Global.js";

export default class FieldUpdateService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.actionAndQuery = [];
    }

    async getFieldUpdateActionAndQueryBy(formid = null) {
        try {
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/admin/fieldupdate/getformquery/${formid}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.actionAndQuery = data.data;
                return { success: true, actionAndQuery: data.data };
            }

            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    async saveActionAndQuery(actionAndQuery) {
        try {
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/admin/fieldupdate/saveformquery`,
                actionAndQuery,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.actionAndQuery = actionAndQuery;
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async GetUpdatingValuesBy(query_id) {
        try {
            // if (this.actionAndQuery.length > 0){
            //     return {success:true, actionAndQuery : this.actionAndQuery};
            // }

            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/admin/fieldupdate/getdetails/${query_id}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.actionAndQuery = data.data;
                return { success: true, actionAndQuery: data.data };
            }

            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    async UpdateActionAndQuery(actionAndQuery, query_id) {
        try {
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/api/admin/fieldupdate/${query_id}/updateformquery`,
                actionAndQuery,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.actionAndQuery = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }

    async DeleteActionAndQuery(query_id) {
        try {
            const { data } = AXIOS_INSTANCE.delete(
                `${this.baseURL}/api/admin/fieldupdate/${query_id}/deleteformquery`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.actionAndQuery = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

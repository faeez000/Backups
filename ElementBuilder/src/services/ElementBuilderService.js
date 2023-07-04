import { AXIOS_INSTANCE } from "../Global.js";

export default class ElementBuilderService {
    /**
     * @readonly
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.tables = null;
    }
    /**
     *
     * @returns {Promise<object>}
     */
    async getTables() {
        try {
            if (!!this.tables) {
                return { success: true, tables: this.tables };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(`${this.baseURL}/tables`, {
                withCredentials: true,
            });

            if (data.success) {
                this.tables = data.data;
                return { success: true, tables: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} table
     * @returns {Promise<object>}
     */
    async getColumnsOf(table) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/columns?table=${table}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, columns: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
}

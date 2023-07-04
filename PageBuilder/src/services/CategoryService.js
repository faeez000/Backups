import CategoryModel from "../domain/CategoryModel.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class CategoryService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.categories = [];
    }

    /**
     * @returns {object}
     */
    async getCategories() {
        try {
            if (this.categories.length > 0) {
                return { success: true, categories: this.categories };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/pagebuilder/categories`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.categories = data.data;
                return { success: true, categories: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {CategoryModel} category
     */
    async create(category) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/pagebuilder/category`,
                category,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.categories = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {CategoryModel} category
     * @returns {object}
     */
    async update(category) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/api/pagebuilder/category`,
                category,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.categories = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} categoryId
     * @returns {object}
     */
    async deleteBy(categoryId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/api/pagebuilder/category?category_id=${categoryId}`,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                this.categories = [];
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

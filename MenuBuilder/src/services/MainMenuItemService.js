import { AXIOS_INSTANCE } from "../Global.js";

import { MainMenuItem } from "../domain/MenuModel.js";

export default class MainMenuItemService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    /**
     *
     * @returns {object}
     */
    async getMainMenuItems() {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/menu/mainmenuitems`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, items: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {MainMenuItem} mainMenuItem
     */
    async addNewItem(mainMenuItem) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/menu/mainmenuitem`,
                mainMenuItem,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} id
     * @param {string} name
     * @returns {object}
     */
    async update(id, name) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.patch(
                `${this.baseURL}/api/menu/mainmenuitem`,
                {
                    id,
                    name,
                },
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, message: data.message };
            }
            return { success: false, message: data.message };
        } catch {
            return false;
        }
    }
    /**
     *
     * @param {number} from
     * @param {number} to
     * @param {string} id
     * @returns {object}
     */
    async moveItem(from, to, id) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/api/menu/mainmenuitem/move`,
                {
                    from,
                    to,
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    /**
     *
     * @param {string} id
     * @param {number} index
     */
    async deleteItem(id, index) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/api/menu/mainmenuitem?id=${id}&index=${index}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false };
        }
    }
}

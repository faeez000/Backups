import { AXIOS_INSTANCE } from "../Global.js";

import { SubMenuItem } from "../domain/MenuModel.js";

export default class SubMenuItemService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    /**
     *
     * @param {string} mainMenuItemId
     */
    async getSubItemsBy(mainMenuItemId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}/api/menu/submenuitems?mainMenuItemId=${mainMenuItemId}`,
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
     * @param {SubMenuItem} subMenuItem
     */
    async addNewItem(subMenuItem) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/api/menu/submenuitem`,
                subMenuItem,
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
     * @param {number} from
     * @param {number} to
     * @param {string} id
     * @param {string} mainMenuItemId
     * @returns {object}
     */
    async moveItem(from, to, id, mainMenuItemId) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.put(
                `${this.baseURL}/api/menu/submenuitem/move?mainMenuItemId=${mainMenuItemId}`,
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
     * @param {string} mainMenuItemId
     * @param {number} index
     * @returns
     */
    async deleteItem(id, mainMenuItemId, index) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.delete(
                `${this.baseURL}/api/menu/submenuitem?id=${id}&mainMenuItemId=${mainMenuItemId}&index=${index}`,
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

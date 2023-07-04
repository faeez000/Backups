import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export class MainMenuItem {
    /**
     *
     * @param {string} id
     * @param {number} index
     * @param {string} name
     * @param {SubMenuItem[]} subMenuItems
     */
    constructor(id = uuidv4(), index = 0, name = "", subMenuItems = []) {
        this.id = id;
        this.index = index;
        this.name = name;
        this.subMenuItems = subMenuItems;
    }
}
export class SubMenuItem {
    /**
     *
     * @param {string} id
     * @param {string} itemType
     * @param {string} itemSubtype
     * @param {string} mainMenuItemId
     * @param {number} index
     * @param {string} name
     */
    constructor(id, itemType, itemSubtype, mainMenuItemId, index, name) {
        this.id = id;
        this.itemType = itemType;
        this.itemSubtype = itemSubtype;
        this.mainMenuItemId = mainMenuItemId;
        this.index = index;
        this.name = name;
    }
}

import { loadSubMenuItems } from "../modules/loadSubMenuItems.js";

export default class MenuCreation {
    static activeMainMenuItem = "";

    static updateMainMenuItem(value) {
        if (value !== this.activeMainMenuItem) {
            loadSubMenuItems(value);
        }
        this.activeMainMenuItem = value;
    }
}

import Section from "./Section.js";

export default class Layout {
    /**
     *
     * @param {string} name
     * @param {Section[]} sections
     */
    constructor(name, sections = []) {
        this.name = name;
        this.sections = sections;

        // Object.freeze(this);
    }
    render() {
        // extedning class will have its own implementation
        throw Error("render is abstract method");
    }
    /**
     * @param {string} url
     */
    setRedirectURLForAllSection(url) {
        for (let section of this.sections) {
            section.redirectURL = url;
        }
    }
    /**
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasSection(name) {
        const index = this.getSectionIndexByName(name);
        return index > -1 ? true : false;
    }
    getSectionAliasByName(name) {
        const index = this.getSectionIndexByName(name);

        return this.sections[index].alias;
    }
    getSectionByName(name) {
        return this.sections[this.getSectionIndexByName(name)];
    }
    hasSingleSection() {
        return this.sections.length === 1;
    }
    /**
     * @private
     * @para {string} name
     */
    getSectionIndexByName(name) {
        return this.sections.findIndex((section) => section.name === name);
    }
}

import Layout from "../core/ValueObject/Layout.js";

export default class GridFormLayout extends Layout {
    /**
     *
     * @param {string} name
     * @param {string[]} sections
     */
    constructor(name, sections = []) {
        super(name, sections);
    }
    render() {
        return `
        <div class="row w-100 p-0 flex-row-between-center m-0 layout-container">
            <a 
              style="width: 69%;height: 200px;" 
              class="flex-row-center-center p-2 section" 
              href="${this.sections[0].redirectURL}&section=${this.sections[0].name}">
                <span>${this.sections[0].alias}</span>
            </a>
            <a style="width: 29%;height: 200px;"
              class="flex-row-center-center p-2 section" 
              href="${this.sections[1].redirectURL}&section=${this.sections[1].name}">
                <span>${this.sections[1].alias}</span>
            </a>
        </div>
        `;
    }
}

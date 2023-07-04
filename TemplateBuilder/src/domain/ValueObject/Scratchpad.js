export default class Scratchpad {
    constructor(content = "", formName = "") {
        this.content = content;
        this.formName = formName;
    }

    update(content = "") {
        this.content = !!content ? content : "";
    }
    updateFormName(name = "") {
        this.formName = !!name ? name : "";
    }
    getContent() {
        return this.content;
    }
    getFormName() {
        return this.formName;
    }
}

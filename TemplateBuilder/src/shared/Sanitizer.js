export default class Sanitizer {
    constructor() {
        this.whiteSpaceRemoverRegex = new RegExp(/\s/, "g");
    }
    trimWhiteSpace(object = "") {
        return object.trim();
    }
}

export default class Variable {
    constructor(name = "", query = "", templateId = "") {
        this.variable_name = name;
        this.variable_query = query;
        this.template_id = templateId;
    }
}

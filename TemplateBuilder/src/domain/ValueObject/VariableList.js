import Variable from "./Variable.js";

export default class VariableList {
    constructor(list = []) {
        this.list = list;
    }
    get() {
        return this.list;
    }
    add(variable = new Variable()) {
        this.list.push(variable);
    }
    update(list) {
        this.list = list;
    }
    deleteVariables(variables = []) {
        variables.forEach((variable) => {
            this.__deleteVariableBy(variable.variable_name);
        });
    }
    __deleteVariableBy(name) {
        const index = this.list.findIndex(
            (variable) => variable.variable_name === name
        );
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }
}

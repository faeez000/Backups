export default class OptionDetail {
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} tableName
     * @param {string} columnName
     * @param {string} value
     * @param {string} id
     */
    constructor(
        formId,
        elementId,
        tableName = null,
        columnName = null,
        conditionalElement = null,
        query=null,
        value = null,
        id = null
    ) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.value = value;
        this.tableName = tableName;
        this.columnName = columnName;
        this.conditionalElement = conditionalElement;
        this.query = query;
    }
}

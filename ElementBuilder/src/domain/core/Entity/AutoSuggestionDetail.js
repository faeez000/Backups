export default class AutoSuggestionDetail {
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} tableName
     * @param {string} columnName
     * @param {string} id
     */
    constructor(
        formId,
        elementId,
        tableName = null,
        columnName = null,
        id = null
    ) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.tableName = tableName;
        this.columnName = columnName;
    }
}

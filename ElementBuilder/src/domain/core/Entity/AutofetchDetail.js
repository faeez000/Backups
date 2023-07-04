export default class AutofetchDetail {
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} elementType
     * @param {string} primaryElementId
     * @param {string} tableName
     * @param {string} columnName
     * @param {string} id
     */
    constructor(
        formId,
        elementId,
        elementType,
        primaryElementId = null,
        tableName = null,
        columnName = null,
        id = null
    ) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.elementType = elementType;
        this.primaryElementId = primaryElementId;
        this.tableName = tableName;
        this.columnName = columnName;
    }
}

export default class DataReferenceDetail {
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
        tableColumn = null,
        titleColumn = null,
        subtitle = null,
        imageColumn = null,
        id = null
    ) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.elementType = elementType;
        this.tableColumn = tableColumn;
        this.titleColumn = titleColumn;
        this.subtitle = subtitle;
        this.imageColumn = imageColumn;
        
    }
}

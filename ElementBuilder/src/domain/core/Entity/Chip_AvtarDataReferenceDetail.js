export default class ChipAndAvtarDataReferenceDetail {
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} elementType
     * @param {string} tableColumn
     * @param {string} titleColumn
     *  @param {string} imageColumn
     * @param {string} id
     */
    constructor(
        formId,
        elementId,
        elementType,
        tableColumn = null,
        titleColumn = null,
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
        this.imageColumn = imageColumn;
    }
}

export default class CardDataReferenceDetail {
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} elementType
     * @param {string} tableColumn
     * @param {string} titleColumn
     *  @param {string} subtitle
     *  @param {string} imageColumn
     *  @param {string} descriptionColumn
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
        descriptionColumn = null,
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
        this.descriptionColumn = descriptionColumn;
    }
}

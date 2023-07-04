export default class EditRowModel {
    /**
     *
     * @param {string} id
     * @param {string} name
     * @param {string} content
     * @param {string} paramenter
     * @param {string} formId
     * @param {string} formName
     */
    constructor(
        formId = null,
        rowsList = [
            {
                Header_Id: null,
                FieldId: null,
                Index_No: null,
            },
        ]
    ) {
        this.FormId = formId;
        this.RowsList = rowsList;
    }
}

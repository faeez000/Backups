export default class CloneFormModel {
    /**
     * @param {string} newName
     * @param {string} oldFormId
     * @param {string} Category
     * @param {string} categoryId
     */
    constructor(
        newName = null,
        oldFormId = null,
        category = null,
        categoryId = null
    ) {
        this.NewForm = newName;
        this.formId = oldFormId;
        this.Category = category;
        this.Category_Id = categoryId;
    }
}

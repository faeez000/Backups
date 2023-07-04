export default class FormModel {
    /**
     * @param {string} formId
     * @param {string} name
     * @param {string} type
     * @param {string} categoryId
     * @param {string} categoryName
     */
    constructor(
        formId = null,
        name = null,
        type = null,
        categoryId = null,
        categoryName = null
    ) {
        // @ts-ignore
        this.form_id = !!formId ? formId : uuidv4();
        this.form_name = name;
        this.form_type = type;
        this.category_id = categoryId;
        this.category_name = categoryName;
    }
}

export default class ActionAndQueryModel {
    /**
     * @param {string} formId
     * @param {string} name
     * @param {string} type
     * @param {string} categoryId
     * @param {string} categoryName
     */
    constructor(
        formId = null,
        action = null,
        query = null,
        name = null,
        
    ) {
        // @ts-ignore
        this.formId = !!formId ? formId : uuidv4();
        this.action = action;
        this.query = query;
        this.name = name;
    }
}

export default class IconActionRedirectToFormDetails {
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} elementType
     *  @param {string} iconRedirectedForm
     * @param {string} id
     */
    constructor(
        formId,
        elementId,
        elementType,
        id = null,
        iconRedirectedForm=null
    ) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.elementType = elementType;
        this.iconRedirectedForm = iconRedirectedForm;
    }
}
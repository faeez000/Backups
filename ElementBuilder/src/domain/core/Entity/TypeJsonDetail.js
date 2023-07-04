export default class TypeJsonDetail {
     /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} elementType
     * @param {string} json
     * @param {string} id
     */
      constructor(
        formId,
        elementId,
        elementType,
        json = null,
        id = null,
        
    ) {
        // @ts-ignore
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.elementType = elementType;
        this.json = json;
       
    }
}
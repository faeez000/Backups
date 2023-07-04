export default class RedirectToFormDetail {
    /**
    *
    * @param {string} formId
    * @param {string} elementId
    * @param {string} elementType
    * @param {string} redirectToForm
    * @param {string} id
    */
     constructor(
       formId,
       elementId,
       elementType,
       redirectToForm = null,
       id = null,
       
   ) {
       // @ts-ignore
       this.id = !!id ? id : uuidv4();
       this.formId = formId;
       this.elementId = elementId;
       this.elementType = elementType;
       this.redirectToForm = redirectToForm;
      
   }
}
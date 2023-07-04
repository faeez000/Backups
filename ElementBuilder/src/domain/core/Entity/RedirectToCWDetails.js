export default class RedirectToCWDetail {
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
       redirectType = null,
       redirectValue = null, 
       id = null,
       
   ) {
       // @ts-ignore
       this.id = !!id ? id : uuidv4();
       this.formId = formId;
       this.elementId = elementId;
       this.elementType = elementType;
       this.redirectType = redirectType;
       this.redirectValue = redirectValue; 
      
   }
}
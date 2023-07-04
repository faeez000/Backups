export default class RedirectToUrlDetail {
    /**
    *
    * @param {string} formId
    * @param {string} elementId
    * @param {string} elementType
    * @param {string} redirectToUrl
    * @param {string} id
    */
     constructor(
       formId,
       elementId,
       elementType,
       redirectToUrl = null,
       id = null,
       
   ) {
       // @ts-ignore
       this.id = !!id ? id : uuidv4();
       this.formId = formId;
       this.elementId = elementId;
       this.elementType = elementType;
       this.redirectToUrl = redirectToUrl;
      
   }
}
import CardDataReferenceDetail from "../domain/core/Entity/CardDataReferenceDetail.js"
import { AXIOS_INSTANCE } from "../Global.js";

export default class CardDataReferenceService{
    /**
    *
    * @param {string} baseURL
    */
     constructor(baseURL) {
       this.baseURL = baseURL;
       /**
        * @type {CardDataReferenceDetail}
        */
       this.cardDataReferenceDetail = null;
   }

    /**
    *
    * @param {string} elementId
    */

   async getCardDataReferenceDetailBy(elementId = null){

     try{
      
       const {data} = await AXIOS_INSTANCE(
         `${this.baseURL}/element/${elementId}`,
         {
           withCredentials: true,
         }
       );

       if (data.success){
         this.cardDataReferenceDetail = data.data;
         return{success: true, detail: this.cardDataReferenceDetail};
       }
       return { success: false};
     } catch {
         return { success: false };
     }
   }

   /**
    *
    * @param {CardDataReferenceDetail} cardDataReferenceDetail
    */

   async saveCardDataReferenceDetail(cardDataReferenceDetail){
     try{

       const {data} = await AXIOS_INSTANCE.post(
         `${this.baseURL}/element/save`,
         cardDataReferenceDetail,
         {
           withCredentials: true,
         }
       );

       if (data.success){
         this.cardDataReferenceDetail = null;
         return { success: true};
       }
       return {success: false, message: data.message};
     } catch (error) {
       return { success: false};
     }
   }

}
import DataReferenceDetail from "../domain/core/Entity/DataReferenceDetail.js"
import { AXIOS_INSTANCE } from "../Global.js";

export default class DataReferenceService{
     /**
     *
     * @param {string} baseURL
     */
      constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {DataReferenceDetail}
         */
        this.dataReferenceDetail = null;
    }

     /**
     *
     * @param {string} elementId
     */

    async getDataReferenceDetailBy(elementId = null){
      
      try{
        
        const {data} = await AXIOS_INSTANCE(
          `${this.baseURL}/element/${elementId}`,
          {
            withCredentials: true,
          }
        );

        if (data.success){
          this.dataReferenceDetail = data.data;
          return{success: true, detail: this.dataReferenceDetail};
        }
        return { success: false};
      } catch {
          return { success: false };
      }
    }

    /**
     *
     * @param {DataReferenceDetail} dataReferenceDetail
     */

    async saveDataReferenceDetail(dataReferenceDetail){
      try{

        const {data} = await AXIOS_INSTANCE.post(
          `${this.baseURL}/element/save`,
          dataReferenceDetail,
          {
            withCredentials: true,
          }
        );

        if (data.success){
          this.dataReferenceDetail = null;
          return { success: true};
        }
        return { success: false, message: data.message};
      } catch (error) {
        return { success: false};
      }
    }

}
import ChipAndAvtarDataReferenceDetail from "../domain/core/Entity/Chip_AvtarDataReferenceDetail.js"
import { AXIOS_INSTANCE } from "../Global.js";

export default class ChipAndAvtarDataReferenceService{
     /**
     *
     * @param {string} baseURL
     */
      constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {ChipAndAvtarDataReferenceDetail}
         */
        this.ChipAndAvtarDataReferenceDetail = null;
    }

     /**
     *
     * @param {string} elementId
     */

    async getChipAndAvtarDataReferenceDetailBy(elementId = null){
      
      try{
        
        const {data} = await AXIOS_INSTANCE(
          `${this.baseURL}/element/${elementId}`,
          {
            withCredentials: true,
          }
        );

        if (data.success){
          this.ChipAndAvtarDataReferenceDetail = data.data;
          return{success: true, detail: this.ChipAndAvtarDataReferenceDetail};
        }
        return { success: false};
      } catch {
          return { success: false };
      }
    }

    /**
     *
     * @param {ChipAndAvtarDataReferenceDetail} ChipAndAvtarDataReferenceDetail
     */

    async saveChipAndAvtarDataReferenceDetail(ChipAndAvtarDataReferenceDetail){
      try{

        const {data} = await AXIOS_INSTANCE.post(
          `${this.baseURL}/element/save`,
          ChipAndAvtarDataReferenceDetail,
          {
            withCredentials: true,
          }
        );

        if (data.success){
          this.ChipAndAvtarDataReferenceDetail = null;
          return { success: true};
        }
        return { success: false, message: data.message};
      } catch (error) {
        return { success: false};
      }
    }

}
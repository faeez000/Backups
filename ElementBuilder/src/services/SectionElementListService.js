import { AXIOS_INSTANCE } from "../Global.js";

export default class SectionElementListService{
    /**
     *
     * @param {string} baseURL
     */
     constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {OptionDetail}
         */
        this.listOfElementsInSection = []
    }

    async getListOfElementsInSectionBy(formId=null, sectionName=null){
        try{
            const {data} = await AXIOS_INSTANCE(
                `${this.baseURL}/elements/${formId}/${sectionName}`,
                {
                    withCredentials:true,
                }
            );
               
            if(data.success){
                this.listOfElementsInSection =  data.data;
                return {success:true, elementList : this.listOfElementsInSection };

            }
            return {success:false, message:data.message}
        }
        catch{
            return {success:false}
        }
    }
}
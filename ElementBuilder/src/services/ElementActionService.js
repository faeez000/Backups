import { AXIOS_INSTANCE } from "../Global.js";

export default class ElementActionService{

    constructor(baseURL){
        this.baseURL = baseURL
    }

    async getElementActionByElementId(elementId=null){
        try{

            const {data} = await AXIOS_INSTANCE (`${this.baseURL}/element/${elementId}`,
            {
                withCredentials:true,
            })
            if (data.success){
                return {success:true , action:data.data}
            }
            return{success:false , message:data.message}
        }catch{
            return{success:false }
    }
    }

    async saveElementAction(action){
        try{
            const {data} = await AXIOS_INSTANCE.post(`${this.baseURL}/element/save`,action,{
                withCredentials:true,
            })

            if(data.success){
                return {success:true , message:data.message}
            }
            return{success:false , message:data.message}
        }catch{
            return{success:false}
        }
    }
}
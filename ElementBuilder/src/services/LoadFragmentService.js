import{AXIOS_INSTANCE} from "../Global.js";

export default class LoadFragmentService {

    constructor(baseURL){
        this.baseURL = baseURL
    }

    async getLoadFragment(elementId=null){

        try{

            const {data} = await AXIOS_INSTANCE (`${this.baseURL}/element/${elementId}`,
                {
                    withCredentials : true,
                })
                if (data.success){
                    return {success:true , fragment:data.data }
                }
                return{success:false , message:data.message}
        }catch{
            return{success:false}
        }
    }


    async saveLoadFragment(fragment){
        try{
            const {data} = await AXIOS_INSTANCE.post (`${this.baseURL}/element/save`,fragment,
            {
                withCredentials:true,
            })
            if(data.success){
                return{success:true , message:data.message}
            }
            return{success:false , message:data.message}
        }catch{
            return{success:false}
        }
    }
} 
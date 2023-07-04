import {AXIOS_INSTANCE} from '../Global.js';

export default class InstanceBehaviourService {
    constructor(baseURL){
      this.baseURL = baseURL
    }

    async getInstanceBehaviourBy(elementId){
        try{
            const {data} = await AXIOS_INSTANCE(`${this.baseURL}/element/${elementId}`,
            {
                withCredentials : true
            })
            if (data.success){
                return {success:true, behaviour:data.data}
            }
            return{success:false, message:data.message}
        }
        catch{

            return{success:false}

        }
    }

    async saveInstanceBehaviour(behaviour){

        try{
            const {data} = await AXIOS_INSTANCE.post(`${this.baseURL}/element/save`,behaviour,
            {
                withCredentials : true
            })

            if(data.success){
                return{success:true, message:data.message}
            }
            return{success:false, message:data.messege}
        }
        catch{
            return {success:false}
        }
    }
}
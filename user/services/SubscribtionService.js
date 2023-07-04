import { data } from "autoprefixer";
import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class SubscribtionService extends BaseAPIService{
    constructor(baseURL){
        super(baseURL);
    }

   async getSubscription(){
        try {
        const {data} = await this.HTTP.get(`${this.baseURL}/api/subscription/order/getsubscription`);
        

        if(data.success){
            return {success:true, data:data.data}
        }
       
        return{success:false, data:data.data.status}
    } catch (error) {
        return {success: false , msg: data.message}
    }
    }

    async createOrderId (planName){
        try {
            const {data}= await this.HTTP.post(`${this.baseURL}/api/subscription/order/${planName}`, { withCredentials: true })
            
            if(data.success){
                return {success:true, data: data.data}
            }
            return {success:false, msg: data.message}
        } catch (error) {
            return {success:false, msg:data.message}            
        }
    }
    
    async paymentVerification(payment){
        try {
            const {data}= await this.HTTP.post(`${this.baseURL}/api/payment/verify`, payment, { withCredentials: true })
            if(data.success){
                return {success:true, msg: data.message}
            }
            return {success:false, msg: data.message}
        } catch (error) {
            return {success:false, msg:data.message}            
        }
    }
    
    async renewPlan(payment){
        try {
            const {data}= await this.HTTP.post(`${this.baseURL}/api/subscription/order/renew`, { withCredentials: true })
            if(data.success){
                return {success:true,data: data.data ,msg: data.message}
            }
            return {success:false, msg: data.message}
        } catch (error) {
            return {success:false, msg:data.message}            
        }
    }

    async getPlanStatus(){
        try{
            const {data} = await this.HTTP.get(`${this.baseURL}/api/subscription/order/getAllPlansCurrentState`, {withCredentials: true})
            if(data.success){
                return{success:true, data: data.data}
            }
            return{ success:false, msg:data.message}
        }catch(error){
            return {success: false, msg: "Failed To Load!"}
        }
    }
    
    

}

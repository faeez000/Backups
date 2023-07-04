import { data } from "autoprefixer";
import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class AccountService extends BaseAPIService{
    constructor(baseURL){
       super(baseURL)
    }
   

    async getAllAccounts() {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/account/getallaccounts`
            );
            if (data.success) {
                return { success: true, data: data.data };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }

    async getStatus(){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/admin/account/getstatus`
            );
            if(data.success){

                return {success:true, data:data.data}

            }
            return{success:false}
        }catch(error){
            return {success:false}
        }
    }
    
    async addAccount(newAcc){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/admin/account/addaccount`, newAcc 
            );
            if(data.success){
                return {success:true, msg:data.message}
            }
            return{success:false, msg:data.message}
        }catch(error){
            return {success:false, msg:data.message}
        }
    }

    async deleteAccount(accountId){
        try {
            const {data} = await this.HTTP.delete(
                `${this.baseURL}/api/admin/account/${accountId}/deleteaccount` 
            );
            if(data.success){
                return {success:true, msg:data.message}
            }
            return{success:false}
        } catch (error) {
            return {success:false, msg:data.message}
        }
    }

    async accountUpdate(accountData){
        try {
            const {data} = await this.HTTP.put(
                `${this.baseURL}/api/admin/account/${accountData.AccountId}/updateaccount`, accountData 
            );
            if(data.success){
                return {success:true, msg: data.message}
            }
            return{success:false, msg: data.message}
        } catch (error) {
            return {success:false, msg:data.message}
        }
    }

    async accountChangeStatus(accountId, value){
        try{
            const {data} = await this.HTTP.put(`${this.baseURL}/api/admin/account/${accountId}/status?active=${value}`);
            if(data.success){
                return{success:true , data:data.data.active, msg: data.data.message}
            }
            return{success:false, msg: data.data.message }
        }catch(error){
            return {success:false, msg:data.data.message}    
        }

    }

}
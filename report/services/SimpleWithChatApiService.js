import BaseAPIService from "../../../shared/infra/service/BaseApiService";

class SimpleWithChatApiService extends BaseAPIService{
    constructor(baseURL){
        super(baseURL);
    }


    async saveChat(chatData){
        
        try{
            const {data} =  await this.HTTP.post(
                `${this.baseURL}/api/user/simplewithchat/savemessage`,
                chatData,
                {
                    withCredentials : true
                }
            )

            if(data.success){
                
                return{success:true, message:data.message}
            }   
            return { success: false, message: data.message };
        }
        catch{
            return this.handleAPIError();
        }
    }


    async getAllChatDataBy(chatId){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/user/simplewithchat/getAllmessages/${chatId}`,
                {
                    withCredentials : true
                }
            );

            if(data.success){
                return {success: true, chatData:data.data}
            }
            return {success: false, message:data.message}
        }
        catch{
            return this.handleAPIError();
        }
    }

    async getChatIdBy(formId, recordId){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/user/getchatdetails/${formId}/${recordId}`,
                {
                    withCredentials : true
                }

            )
            if(data.success){
                return{success:true, chatId:data.data}
            }
            return{success:false, message:data.message}
        }
        catch{
            return this.handleAPIError();
        }
    }
    
    async updateStatus(status, chatId){
        try{
            const {data} = await this.HTTP.put(
                `${this.baseURL}/api/user/simplewithchat/update/status/${chatId}`,
                status,
                {
                    withCredentials: true
                }
                
            )
            if(data.success){
                return{success:true, message:data.message}
            }
            return { success: false, message: data.message };
        }
        catch{
            return this.handleAPIError();
        }
    }


    async getStatusBy(chatId){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/user/get/status/${chatId}`,
                {
                    withCredentials: true
                }
            )
            if(data.success){
                return{success:true, status:data.data}
            }
            return{success:false, message:data.message}
        }
        catch{
            return this.handleAPIError();
        }
    }


    

}

export { SimpleWithChatApiService };

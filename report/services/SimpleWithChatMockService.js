import BaseAPIService from "../../../shared/infra/service/BaseApiService";
import { ChatData } from "../DATA";


class SimpleWithChatMockService extends BaseAPIService{
    constructor(baseURL){
        super(baseURL);
        this.data = {
            chatData : ChatData.chat,
        }
    }

    async addChatOnSendClick(chatData){
        console.log('chatData',chatData)
        try{
            const data = {
                success:true,
                chatData: chatData,
                message:"Data save Successfully",

            }
            if(data.success){
                this.data.chatData.push(chatData);
                console.log('data.chatData1', data.chatData)
                return{success:true, message:data.message}
            }
            data.message = "Chat Data saving Failed";
            return { success: false, message: data.message };
        }
        catch{
            return this.handleAPIError();
        }
    }

   async getChatDataOnRefreshClick(chatId){
        try{
            const data = {success: true , data: this.data.chatData};

            if(data.success){
                return {success:true, chatData:data.data}
            }
            data.message = "chat not  Available";
            return {success:false, message:data.message}
        }
        catch{
            return this.handleAPIError();
        }
    }
}

export {SimpleWithChatMockService};
import { showSuccessOrFailure } from "../modules/showSuccessOrFailure";


class SimpleWithChatController{
    constructor(apiService){
        this.apiService = apiService;
    }

    async getChatDataBy(chatId){
        const {success, chatData, message} =
        await this.apiService.getAllChatDataBy(chatId);

        try{
            if(!success){
                return
            }
            return chatData
        }
        catch(error){
            console.log(error)
        }
        finally{
            showSuccessOrFailure({ success, message });
        }
    }

    async addChatOnSendClick(chatData){
        const {success, message } = await this.apiService.saveChat(
            chatData
            );

        try{
            if(!success){
                console.log('something went wrong' + message)
            }
            return success

        }
        catch(error){
            console.log('error', error)
        }
        // finally{
        //     showSuccessOrFailure({ success, message });
        // }
    }

    async getChatIdBy(formId, recordId) {

        const {success, chatId, message} = await this.apiService.getChatIdBy(formId, recordId);

        try{
            if(!success){

                return
            }
            return chatId
        }
        catch(error){
            console.log(error)
        }
        finally{
            showSuccessOrFailure({ success, message });
        }
    }

    async updateStatus(status, chatId){
        const {success, message } = await this.apiService.updateStatus(status, chatId);
        try{
            if(!success){
                console.log('something went wrong' + message)
            }
            return success

        }
        catch(error){
            console.log('error', error)
        }
        finally{
            showSuccessOrFailure({ success, message });
        }
    }

    async getStatusBy(chatId){
        const {success, status, message } = await this.apiService.getStatusBy();

        try{
            if(!success){
                console.log('something went wrong' + message)
            }
            return status

        }
        catch(error){
            console.log('error', error)
        }
        finally{
            showSuccessOrFailure({ success, message });
        }
    }
}

export { SimpleWithChatController };
import {showSuccessOrFailureMessagePopUp} from '../SnackBar/SuccessOrFailPopUp';

export default class NotificationController {
    constructor(apiService){
        this.apiService = apiService;
    }

    async getNotification(){
        const {success, notificationList, message } = 
        await this.apiService.getNotification();

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message});
            }
            return notificationList;
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }

    async saveNotification (notificationDetail) {
        const {success, message} = 
        await this.apiService.saveNotification(notificationDetail);

        try{
            if(!success){
                return ;
            }
            return true;
        }catch(error){
            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }
    }

    async updateNotification (notificationDetail, notificationId) {
       
        const {success, message} = 
        await this.apiService.updateNotification(
            notificationDetail,
            notificationId
            );
            
        try{
            if(!success){
               
                return ;
                
            }
            return true;
        }catch(error){
            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }
    }


    async deleteNotification (notificationId){
        const {success, message} = 
        await this.apiService.deleteNotification(notificationId);

        try{
            if(!success){
                return
            }
            return true
        }
        catch(error){

            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }

    }

    
}
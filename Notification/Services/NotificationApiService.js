import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class NotificationApiService extends BaseAPIService{
    constructor(baseURL){
        super(baseURL);
    }

    async getNotification(){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/notification/all/getnotificationtagList`,
                {
                    withCredentials: true
                }  
            )
            if(data.success){
                return{success:true , notificationList:data.data}
            }
            return{success:false, message:data.message}
        }catch(error){
            this.handleAPIError();
        }
    }

    async saveNotification(notificationDetail){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/notification/tag/save`,
                notificationDetail,
                {
                    withCredentials : true
                }
            )
            if(data.success){
                return{success:true, message:data.message}
            }
            return{success:false, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }

    async updateNotification (notificationDetail, notificationId){
        try{
            const {data} = await this.HTTP.put(
                `${this.baseURL}/api/notification/${notificationId}/editnotification`,
                notificationDetail,
                {

                withCredentials : true

                }
            )
            if(data.success){
                return{success: true, message: data.message}
            }
            return{success: false, message: data.message}
        }catch (error) {
            this.handleAPIError();
        }
        
    }

    async deleteNotification(notificationId){
        try{
            const {data} = await this.HTTP.delete(
                `${this.baseURL}/api/notification/notificationtag/delete/${notificationId}/notificationtag`,
                {
                    withCredentials: true
                }
            )
            if(data.success){
                return{success:true, message:data.message}
            }
            return{success:true, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }
}
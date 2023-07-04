import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class UserApiService extends BaseAPIService{
    constructor(baseURL){
        super(baseURL);
    }

    async getUserList(){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/notification/fornotification/userlist`,
                {
                    withCredentials : true
                }

            )

            if(data.success){
                return {success:true, userList:data.data}       
            }
            return{success: false, message:data.message};
        }
        catch(error){
             this.handleAPIError();
        }
    }

    async getTagUserList(tagId){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/notification/tag/${tagId}/alluser`,
                {
                    withCredentials : true
                }

            )

            if(data.success){
                return {success:true, tagUserList:data.data}       
            }
            return{success: false, message:data.message};
        }
        catch(error){
             this.handleAPIError();
        }
    }

    async addTagUser(TagUserDetails){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/notification/tag/adduser`,
                TagUserDetails,
                {
                    withCredentials : true
                }
                
            )
            if(data.success){
                return{success:true, message:data.message};
            }
            return{success:false, message:data.message};

        }
        catch(error){
            this.handleAPIError();
        }
    }

    async deleteTagUser(tagId, userId){
        try{
            const {data} = await this.HTTP.delete(
                `${this.baseURL}/api/notification/tag/delete/${tagId}/user/${userId}`,
                {
                    withCredentials : true
                }
            )
            if(data.success){
                return{success:true, message:data.message};
            }
            return{success:false, message:data.message};
        }
        catch(error){
            this.handleAPIError();
        }
    }
}
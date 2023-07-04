import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class TagApiService extends BaseAPIService{
    constructor(baseURL){
        super(baseURL);
    }

    async getTag(){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/notification/tag/all`,
                {
                    withCredentials : true
                }

            )

            if(data.success){
                return {success:true, tag:data.data}       
            }
            return{success: false, message:data.message};
        }
        catch(error){
             this.handleAPIError();
        }
    }

    async addTag(TagDetails){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/notification/tag/addtag`,
                TagDetails,
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

    async updateTag (tagDetails, tagId){
        try{
            const {data} = await this.HTTP.put(
                `${this.baseURL}/api/notification/tag/${tagId}/edittag`,
                tagDetails,
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

    async deleteTag(tagId){
        try{
            const {data} = await this.HTTP.delete(
                `${this.baseURL}/api/notification/tag/${tagId}/deletetag`,
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
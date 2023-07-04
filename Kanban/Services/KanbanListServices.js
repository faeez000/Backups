import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class  KanbanListServices extends BaseAPIService {
    constructor(baseURL){
        super(baseURL);
    }

    async getKanbanList(){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/kanban/all`,
                {
                    withCredentials : true
                }
            )

            if(data.success){
                return{success:true, kanbanList:data.data}
            }
            return{success:false, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }


    async saveKanban(kanbanDetails){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/kanban/save`,
                kanbanDetails,
                {
                    withCredentials : true
                }
            )

            if (data.success){
                return{success:true, message:data.message}
            }
            return{success:false, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }

    async updateKanban(kanbanId, kanbanDetails){
        try{
            const{data} = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/kanban/${kanbanId}/update`,
                kanbanDetails,
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

    async deleteKanban(kanbanId){
        try{
            const{data} = await this.HTTP.delete(
                `${this.baseURL}/api/admin/settings/kanban/delete/${kanbanId}`,
                {
                    withCredentials : true
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
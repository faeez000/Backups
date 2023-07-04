import BaseAPIService from '../../../shared/infra/service/BaseApiService';

export default class  KanbanBoardServices extends BaseAPIService {
    constructor(baseURL){
        super(baseURL);
    }

    async getKanbanStageList(kanbanId){
        try{
            const {data} = await this.HTTP.get(
                `${this.baseURL}/api/admin/settings/kanban/${kanbanId}/stages/all`,
                {
                    withCredentials : true
                }
            )

            if(data.success){
                return{success:true, kanbanStageList:data.data}
            }
            return{success:false, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }


    async saveKanbanStage(kanbanId, kanbanStageDetails){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/kanban/${kanbanId}/stages/save`,
                kanbanStageDetails,
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

    async updateKanbanStage(StageId, kanbanId, kanbanStageDetails){
        try{
            const{data} = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/kanban/stages/${StageId}/${kanbanId}/update`,
                kanbanStageDetails,
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

    async deleteKanbanStage(StageId){
        try{
            const{data} = await this.HTTP.delete(
                `${this.baseURL}/api/admin/settings/kanban/stage/delete/${StageId}`,
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

    async addKanbanCard(cardDetails){
        try{
            const {data} = await this.HTTP.post(
                `${this.baseURL}/api/admin/settings/kanban/card/save`,
                cardDetails,
                {
                    withCredentials : true
                }
            )
            if(data.success){
                return{success:true , message:data.message}
            }
            return{success:true, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }

    async updateKanbanCard(CardId, cardDetails){
        try{
            const{data} = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/kanban/card/update/${CardId}`,
                cardDetails,
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

    async deleteKanbanCard(CardId){
        try{
            const{data} = await this.HTTP.delete(
                `${this.baseURL}/api/admin/settings/kanban/card/delete/${CardId}`,
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

    async DraggingCard(targetStageId, cardId){
        try{
            const {data} = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/kanban/card/move/${targetStageId}/${cardId}`,
                {
                    withCredentials:true
                }
                
            )
            if(data.successs){
                return{success: true, message:data.message}
            }
            return{success: false, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
    }

    async MovingCard(kanbanId,StageId, cardDetail){
        try{
            const {data} = await this.HTTP.put(
                `${this.baseURL}/api/admin/settings/kanban/${kanbanId}/${StageId}/move`,
                cardDetail,
                {
                    withCredentials:true
                }
                
            )
            if(data.successs){
                return{success: true, message:data.message}
            }
            return{success: false, message:data.message}
        }
        catch(error){
            this.handleAPIError();
        }
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
}
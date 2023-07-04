import {showSuccessOrFailureMessagePopUp} from '../SnackBar/SuccessOrFailPopUp';

export default class KanbanBoardController {
    constructor(apiService){
        this.apiService = apiService;
    }

    async getAllKanbanStage(kanbanId){
        const {success, kanbanStageList, message} = await this.apiService.getKanbanStageList(kanbanId);

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message});
            }
            return kanbanStageList;
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }

    async addKanbanStageWith(kanbanId,kanbanStageDetails){
        const {success, message} = await this.apiService.saveKanbanStage(kanbanId, kanbanStageDetails);

        try{
            if(!success){
                return;
            }
            return true;
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }
    }


    async updateKanbanStageDetailsBy(StageId, kanbanId, kanbanStageDetails){
        const {success, message} = await this.apiService.updateKanbanStage(StageId, kanbanId, kanbanStageDetails)

        try{
            if(!success){
                return
            }
            return true;

        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }
    }


    async deleteStageBy(StageId){
        const {success, message} = await this.apiService.deleteKanbanStage(StageId)

        try{
            if(!success){
                return
            }
            return true;
        }
        catch(error){

            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }
    }

    async addKanbanCardWith(CardDetails){
        const {success, message} = await this.apiService.addKanbanCard(CardDetails)

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

    async UpdateCardDetailsBy(cardId, cardDetails){
        const {success, message} = await this.apiService.updateKanbanCard(cardId, cardDetails)
     
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

    async deleteCardBy(CardId){
        const {success, message} = await this.apiService.deleteKanbanCard(CardId)

        try{
            if(!success){
                return
            }
            return true;
        }
        catch(error){

            console.log(`error : something went wrong ${error}`);
        }
        finally{
            showSuccessOrFailureMessagePopUp({success, message});
        }
    }

    async DraggingCardBy(targetStageId, cardId){
        const {success, message} = await this.apiService.DraggingCard(targetStageId, cardId)

        try{
            if(!success){
                return
            }
            return true;
        }
        catch(error){

            console.log(`error : something went wrong ${error}`);
        }
        // finally{
        //     showSuccessOrFailureMessagePopUp({success, message});
        // }
    }

    async movingCardBy(kanbanId,StageId, cardDetail){
        const {success, message} = await this.apiService.MovingCard(kanbanId, StageId, cardDetail)

        try{
            if(!success){
                return
            }
            return true;
        }
        catch(error){

            console.log(`error : something went wrong ${error}`);
        }
        // finally{
        //     showSuccessOrFailureMessagePopUp({success, message});
        // }
    }

    async GetUserList (){
        const {success, userList, message} = await this.apiService.getUserList()

        try{
            if(!success){
                return
            }
            return userList
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);

        }
    }

}
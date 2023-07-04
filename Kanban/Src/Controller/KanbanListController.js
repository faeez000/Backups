import {showSuccessOrFailureMessagePopUp} from '../SnackBar/SuccessOrFailPopUp';

export default class KanbanListController {
    constructor(apiService){
        this.apiService = apiService;
    }

    async getAllKanban(){
        const {success, kanbanList, message} = await this.apiService.getKanbanList();

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message});
            }
            return kanbanList;
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


    async addKanbanWith(kanbanDetails){
        const {success, message} = await this.apiService.saveKanban(kanbanDetails);

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

    async updateKanbanDetailsBy(kanbanId, kanbanDetails){
        const {success, message} = await this.apiService.updateKanban(kanbanId, kanbanDetails)

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

    async deleteKanbanBy(kanbanId){
        const {success, message} = await this.apiService.deleteKanban(kanbanId)

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
}
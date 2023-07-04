import {showSuccessOrFailureMessagePopUp} from '../SnackBar/SuccessOrFailPopUp';

export default class TagController {
    constructor(apiService){
        this.apiService = apiService;
    }

    async getTag(){
        const {success, tag, message } = 
        await this.apiService.getTag();

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message});
            }
            return tag;
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }

    async addTag (tagDetails) {
        const {success, message} = 
        await this.apiService.addTag(tagDetails);

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

    async updateTag (tagDetails, tagId) {
        
        const {success, message} = 
        await this.apiService.updateTag(
            tagDetails,
            tagId
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

    async deleteTag (tagId){
        const {success, message} = 
        await this.apiService.deleteTag(tagId);

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
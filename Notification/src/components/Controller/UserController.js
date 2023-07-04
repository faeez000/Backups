import {showSuccessOrFailureMessagePopUp} from '../SnackBar/SuccessOrFailPopUp';

export default class UserController {
    constructor(apiService){
        this.apiService = apiService
    }

    async getUserList(){
        const {success, userList, message} = 
        await this.apiService.getUserList();

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message});
            }
            return userList;
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


    async getTagUserList(tagId){
        const {success, tagUserList, message} = 
        await this.apiService.getTagUserList(tagId);

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return tagUserList
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


    async addTagUser (TagUserDetails){
        const {success, message} = 
        await this.apiService.addTagUser(TagUserDetails);

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

    async deleteTagUser (tagId, userId){
        const {success,message} = 
        await this.apiService.deleteTagUser(tagId, userId);

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
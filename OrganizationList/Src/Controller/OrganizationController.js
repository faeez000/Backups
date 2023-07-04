import {showSuccessOrFailureMessagePopUp} from '../SnackBar/SuccessOrFailureMessage';

export default class OrganizationController {
    constructor(apiService){
        this.apiService = apiService

    }

    async getAllOrganizationByUserId(){
        const {success, organizationsnames, message} = await this.apiService.showAllOrganizationsByUserId()

        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return organizationsnames
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }

    async checkIsAdminBy(organizationId){
        const {success, isAdmin, message} = await this.apiService.checkIsAdmin(organizationId)
        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return isAdmin
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }

    async SwitchOrganizationBy(organizationId){
        const {success, message} = await this.apiService.updateRecentOrganization(organizationId)
        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return showSuccessOrFailureMessagePopUp({success, message})
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


    async getOrganizationDetailsById(){
        const {success, organizationinfo, message} = await this.apiService.getOrganizationDetailsById()
        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return organizationinfo
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


    async getOrganizationDetailsByOrganizationId(organizationId){
        const {success, organizationdetails, message} = await this.apiService.getOrganizationDetailsByOrganizationId(organizationId)
        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return organizationdetails
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }

    async updateOrganizationDetailsBy(organization){
        const {success, message} = await this.apiService.update(organization)
        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return showSuccessOrFailureMessagePopUp({success, message})
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


    async DeleteOrganizationBy(organizationId){
        const {success, message} = await this.apiService.deleteBy(organizationId)
        try{
            if(!success){
                return showSuccessOrFailureMessagePopUp({success, message})
            }
            return showSuccessOrFailureMessagePopUp({success, message})
        }
        catch(error){
            console.log(`error : something went wrong ${error}`);
        }
    }


}
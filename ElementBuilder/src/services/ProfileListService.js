import { AXIOS_INSTANCE } from "../Global.js";

export default class ProfileListService{
    constructor(baseUrl){
        this.baseUrl = baseUrl

        this.profileList = []; 
    }

    async getProfileList () {
        try{
            // if(this.profileList.length > 0){
            //     return {success:true, profiles : this.profileList};
            // }
            const {data} = await AXIOS_INSTANCE(
                `${this.baseUrl}/showallprofile/forSimpleWithChat`,
                {
                    withCredentials: true,
                }
            );

            if (data.success){
                this.profileList = data.data
                return{success:true, profiles : this.profileList};
            }
            return{ success: false};
        }
        catch{
            return{ success: false};
        } 
    }
}
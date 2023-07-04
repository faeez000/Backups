import {userApiService} from '../../service/index.js';

export async function checkIsAdmin(){

    const {success, account} = await userApiService.getUserAccount();

    if (!success){
        window.location.href = '/404';
        return;
    }

    if (account.isAdmin === false){
        window.location.href = '/403';
        return
    }


    return;
}
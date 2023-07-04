import TagApiService from './TagApiService';
import NotificationApiService from './NotificationApiService';
import UserApiService from './UserApiService';
import { apiHostController } from '../../../shared/core/ApiHostController';

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const tagApiService = new TagApiService(API_DOMAIN_URL);

const notificationApiService = new NotificationApiService(API_DOMAIN_URL);

const userApiService = new UserApiService(API_DOMAIN_URL);


export{
    tagApiService,
    notificationApiService,
    userApiService,
}
import {tagApiService,
        notificationApiService, userApiService} from '../../../Services/index';
import TagController from './TagController';
import NotificationController from './NotificationController';
import UserController from './UserController';


const tagController = new TagController(tagApiService);
const notificationController = new NotificationController(notificationApiService);
const userController = new UserController(userApiService);


export{tagController, notificationController, userController}
import { apiHostController } from '../../../shared/core/ApiHostController';
import KanbanListServices from './KanbanListServices';
import KanbanBoardServices from './KanbanBoardServices';

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const kanbanListService = new KanbanListServices(API_DOMAIN_URL);
const kanbanBoardService = new KanbanBoardServices(API_DOMAIN_URL)


export{
    kanbanListService,
    kanbanBoardService,
}
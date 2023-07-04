import {kanbanListService, kanbanBoardService} from '../../Services/index';
import KanbanListController from './KanbanListController';
import KanbanBoardController from './KanbanBoardController';


const kanbanListController = new KanbanListController(kanbanListService)
const kanbanBoardController = new KanbanBoardController(kanbanBoardService)


export {kanbanListController, kanbanBoardController}
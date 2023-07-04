import { filterApiMockService, reportApiService } from "../services";
import {simpleWithChatService} from '../services/index';
import { ReportController } from "./ReportController";
import { FilterController } from "./FilterController";
import {SimpleWithChatController} from './SimpleWithChatController';

const reportController = new ReportController(reportApiService);
const filterController = new FilterController(filterApiMockService);

const simpleWithChatController = new SimpleWithChatController(simpleWithChatService);

export { reportController, filterController, simpleWithChatController };

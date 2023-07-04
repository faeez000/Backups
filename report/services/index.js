import { apiHostController } from "../../../shared/core/ApiHostController";
import { EmailTemplateApiService } from "./EmailTemplateApiService";
import { FilterApiMockService } from "./FilterApiMockservice";
import { FilterApiService } from "./FilterApiService";
import { FormApiMockService } from "./FormApiMockService";
import { FormApiService } from "./FormApiServices";
import { ReportApiMockService } from "./ReportApiMockService";
import { ReportApiService } from "./ReportApiService";
import { SMSTemplateApiService } from "./SMSTemplateApiService";
import { TemplateApiMockService } from "./TemplateApiMockService";
import { TemplateApiService } from "./TemplateApiService";
import {SimpleWithChatMockService} from './SimpleWithChatMockService';
import {SimpleWithChatApiService} from './SimpleWithChatApiService';

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

// const reportApiService = new ReportApiMockService();
// const formApiSerivce = new FormApiMockService();
// const templateApiService = new TemplateApiMockService();
// const filterApiMockService = new FilterApiMockService("");

// const simpleWithChatMockService = new SimpleWithChatMockService();

const reportApiService = new ReportApiService(API_DOMAIN_URL);
const formApiSerivce = new FormApiService(API_DOMAIN_URL);
const templateApiService = new TemplateApiService(API_DOMAIN_URL);
const filterApiMockService = new FilterApiService(API_DOMAIN_URL);
const smsTemplateApiService = new SMSTemplateApiService(API_DOMAIN_URL);
const emailTemplateApiService = new EmailTemplateApiService(API_DOMAIN_URL);
const simpleWithChatService = new SimpleWithChatApiService(API_DOMAIN_URL);

export {
    reportApiService,
    filterApiMockService,
    formApiSerivce,
    templateApiService,
    smsTemplateApiService,
    emailTemplateApiService,
    simpleWithChatService
};

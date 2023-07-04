import { FormsAPIService } from "./FormsAPIService";
import { SMSTemplateAPIService } from "./SMSTemplateAPIService";
import { SMSTempVariableAPIservice } from "./SMSTempVariableAPIservice";
import { ElementsAPIservice } from "./ElementsAPIservice";
import { apiHostController } from "../../../shared/core/ApiHostController";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const smsTemplateAPIService = new SMSTemplateAPIService(API_DOMAIN_URL);
const formsAPIService = new FormsAPIService(API_DOMAIN_URL);
const smsTempVariableAPIservice = new SMSTempVariableAPIservice(API_DOMAIN_URL);
const elementsAPIservice = new ElementsAPIservice(API_DOMAIN_URL);

export {
    smsTemplateAPIService,
    formsAPIService,
    smsTempVariableAPIservice,
    elementsAPIservice,
};

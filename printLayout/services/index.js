import { apiHostController } from "../../../shared/core/ApiHostController.js";
import PrintLayoutService from "./PrintLayoutService.js";
import TemplateService from "./TemplateService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const printLayoutService = new PrintLayoutService(API_DOMAIN_URL);
const templateService = new TemplateService(API_DOMAIN_URL);
export { printLayoutService, templateService };

import { apiHostController } from "../../../shared/core/ApiHostController.js";
import OrganizationService from "./OrganizationService.js";
import TemplateService from "./TemplateService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const baseURL = `${API_DOMAIN_URL}/api`;

const organizationService = new OrganizationService(baseURL);
const templateService = new TemplateService(baseURL);
export { organizationService, templateService };

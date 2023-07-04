import { apiHostController } from "../domain/ApiHostController/ApiHostController.js";
import TemplateSettingService from "./TemplateService.js";
import UserApiSerivce from "./UserApiSerivce.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const templateServiceBaseUrl = `${API_DOMAIN_URL}/api/builder/templatebuilder`,
    userApiServiceBaseUrl = `${API_DOMAIN_URL}/api/admin`;

const templateService = new TemplateSettingService(
    templateServiceBaseUrl,
    "template"
);
const userApiService = new UserApiSerivce(userApiServiceBaseUrl);

export { templateService, userApiService };

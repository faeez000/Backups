import { apiHostController } from "../../../shared/core/ApiHostController";
import { EmailConfigAPISerivce } from "./EmailConfigAPISerivce";
import { EmailTemplateBuilderAPISerivce } from "./EmailTemplateBuilderAPISerivce";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const emailConfigAPISerivce = new EmailConfigAPISerivce(API_DOMAIN_URL);
const emailTemplateBuilderAPISerivce = new EmailTemplateBuilderAPISerivce(
    API_DOMAIN_URL
);

export { emailConfigAPISerivce, emailTemplateBuilderAPISerivce };

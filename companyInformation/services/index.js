import { apiHostController } from "../../../shared/core/ApiHostController";
import { CompanyService } from "./CompanyService";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const companyService = new CompanyService(API_DOMAIN_URL);

export { companyService };

import OrganizationSwitchService from "./OrganizationSwitchService.js";
// import ImageUploadService from "./ImageUploadService.js"; imageUploadService
import { apiHostController } from "../../../shared/core/ApiHostController.js";
// import UserAccountService from "./UserAccountService.js"; userAccountService

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

// const imageUploadService = new ImageUploadService(API_DOMAIN_URL);
const organizationSwitchService = new OrganizationSwitchService(API_DOMAIN_URL);
// const userAccountService = new UserAccountService(API_DOMAIN_URL);

export { organizationSwitchService,  };

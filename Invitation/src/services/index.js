import { apiHostController } from "../Domain/ApiHostController/ApiHostController.js";
import InvitationService from "./InvitationService.js";
import UserAccountService from "./UserAccountService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const invitationService = new InvitationService(API_DOMAIN_URL);
const userAccountService = new UserAccountService(API_DOMAIN_URL);

export { invitationService, userAccountService };

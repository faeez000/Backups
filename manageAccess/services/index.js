import { apiHostController } from "../../../shared/core/ApiHostController";
import { UserService } from "./UserService";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const userService = new UserService(API_DOMAIN_URL);

export { userService };

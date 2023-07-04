import AccountService from "./AccountService.js";
import { apiHostController } from "../../../shared/core/ApiHostController";

const API_DOMAIN_URL =apiHostController.getApiDomain(window.location.hostname);

const accountService = new AccountService(API_DOMAIN_URL);

export{accountService};
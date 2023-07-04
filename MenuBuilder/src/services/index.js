import FormListService from "./FormListService.js";
import MainMenuItemService from "./MainMenuItemService.js";
import SubMenuItemService from "./SubMenuItemService.js";
import PageListService from "./PageListService.js";
import LedgerListService from "./LedgerListService.js";
import { apiHostController } from "../domain/ApiHostController/ApiHostController.js";
import UserAccountService from "./UserAccountService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const formListService = new FormListService(API_DOMAIN_URL);

const mainMenuItemService = new MainMenuItemService(API_DOMAIN_URL);

const subMenuItemService = new SubMenuItemService(API_DOMAIN_URL);

const pageListService = new PageListService(API_DOMAIN_URL);

const ledgerListService = new LedgerListService(API_DOMAIN_URL);

const userAccountService = new UserAccountService(API_DOMAIN_URL);

export {
    formListService,
    mainMenuItemService,
    subMenuItemService,
    pageListService,
    userAccountService,
    ledgerListService,
};

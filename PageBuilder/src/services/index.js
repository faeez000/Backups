import { apiHostController } from "../domain/ApiHostController/ApiHostController.js";
import CategoryService from "./CategoryService.js";
import FormService from "./FormService.js";
import FieldUpdateService from "./FieldUpdateSevice.js";
import UserApiSerivce from "./UserApiSerivce.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const formService = new FormService(API_DOMAIN_URL);
const categoryService = new CategoryService(API_DOMAIN_URL);
const userApiService = new UserApiSerivce(API_DOMAIN_URL);
const fieldupdateservice = new FieldUpdateService(API_DOMAIN_URL);

export { formService, categoryService, userApiService, fieldupdateservice };

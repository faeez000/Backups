import ProfileService from "./ProfileService.js";
import RoleService from "./RoleService.js";
import UserService from "./UserService.js";
import ImageUploadService from "./ImageUploadService.js";
import CommonService from "./CommonService.js";
import RightService from "./RightService.js";
import OrganizationInfoService from "./OrganizationInfoService.js";
import { apiHostController } from "../domain/ApiHostController/ApiHostController.js";
import UserAccountService from "./UserAccountService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const baseURL = `${API_DOMAIN_URL}/api`;

const profileService = new ProfileService(baseURL);
const roleService = new RoleService(baseURL);
const userService = new UserService(baseURL);
const commonService = new CommonService(baseURL);
const rightService = new RightService(baseURL);
const organizationInfoService = new OrganizationInfoService(baseURL);

const imageUploadServiceBaseURL = `${baseURL}/api`;
const imageUploadService = new ImageUploadService(imageUploadServiceBaseURL);
const userAccountService = new UserAccountService(API_DOMAIN_URL);

export {
    imageUploadService,
    profileService,
    roleService,
    userService,
    commonService,
    rightService,
    organizationInfoService,
    userAccountService,
};

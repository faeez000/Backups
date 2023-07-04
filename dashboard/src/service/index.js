import DashboardSettingService from "./DashboardSettingService.js";
import DashboardService from "./DashboardService.js";
import DashboardQueryService from "./DashboardQueryService.js";
import { apiHostController } from "../utils/ApiHostController.js";
import UserAccountService from "./UserAccountService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const dashboardUrl = `${API_DOMAIN_URL}/api/builder/dashboardbuilder`;
const dashboardQueryUrl = `${API_DOMAIN_URL}/api/builders/queryexecution/query`;

const dashboardSettingService = new DashboardSettingService(dashboardUrl);
const dashboardService = new DashboardService(dashboardUrl);
const dashboardQueryService = new DashboardQueryService(dashboardQueryUrl);
const userAccountService = new UserAccountService(API_DOMAIN_URL);

export {
    dashboardSettingService,
    dashboardService,
    dashboardQueryService,
    userAccountService,
};

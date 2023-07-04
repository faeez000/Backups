import { apiHostController } from "../../../shared/core/ApiHostController";
import { ReportsApiServices } from "./ReportsApiServices";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const reportsApiServices = new ReportsApiServices(API_DOMAIN_URL);

// const reportsApiServices = new ReportsApiMockServices();

export { reportsApiServices };

import { apiHostController } from "../../../shared/core/ApiHostController";
import ReportService from "./ReportService";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const reportService = new ReportService(API_DOMAIN_URL);

export { reportService };

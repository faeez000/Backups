import FormService from "./FormService";
import ReportService from "./ReportService";
import LedgerService from "./LedgerService";
import FormMockService from "./FormMockService";
import FilterService from "./FilterService";
import { apiHostController } from "../../../shared/core/ApiHostController";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const formService = new FormService(API_DOMAIN_URL);
const reportService = new ReportService(API_DOMAIN_URL);
const ledgerService = new LedgerService(API_DOMAIN_URL);
const filterService = new FilterService(API_DOMAIN_URL);
// const formService = new FormMockService(API_DOMAIN_URL);

export { formService, reportService, ledgerService, filterService };

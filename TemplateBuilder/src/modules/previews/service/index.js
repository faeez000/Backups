import { apiHostController } from "../../../domain/ApiHostController/ApiHostController.js";
import TemplatePrintPreviewService from "./TemplatePrintPreviewService.js";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const baseURL = `${API_DOMAIN_URL}/api/builder/templatebuilder`;

const templatePrintPreviewService = new TemplatePrintPreviewService(baseURL);

export { templatePrintPreviewService };

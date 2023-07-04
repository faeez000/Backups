import { apiHostController } from "../../../domain/ApiHostController/ApiHostController.js";
import QueryParser from "../../../shared/QueryParser.js";
import PreviewService from "./PreviewService.js";
import PrintPreviewService from "./PrintPreviewService.js";
import ScratchpadService from "./ScratchpadService.js";
import TemplateBuilderService from "./TemplateBuilderService.js";
import VariableService from "./VariableService.js";

const templateId = QueryParser.getValueOf("template_id");
const type = QueryParser.getValueOf("type");

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const baseURL = `${API_DOMAIN_URL}/api/builder/templatebuilder`;

const templateBuilderService = new TemplateBuilderService(
    baseURL,
    templateId,
    type
);

const scratchpadService = new ScratchpadService(baseURL, templateId, type);

const variableService = new VariableService(baseURL, templateId, type);

const printPreviewService = new PrintPreviewService(baseURL, templateId, type);

const previewService = new PreviewService(baseURL, templateId, type);

export {
    scratchpadService,
    variableService,
    printPreviewService,
    templateBuilderService,
    previewService,
};

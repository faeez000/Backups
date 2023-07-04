import PreviewService from "./service/PreviewService.js";
import PrintPreviewService from "./service/PrintPreviewService.js";
import VariableService from "./service/VariableService.js";
import QueryParser from "../../shared/QueryParser.js";

import TemplatePrintPreviewer from "./TemplatePrintPreivewer.js";

const templateId = QueryParser.getValueOf("template_id");
const type = QueryParser.getValueOf("type");
const entryId = QueryParser.getValueOf("entry_id");
const formName = QueryParser.getValueOf("form_name");

const [development, production] = [
    "http://localhost:44340/api/builder/templatebuilder",
    "https://api.cleverlywork.com/api/builder/templatebuilder",
];

const printPreviewService = new PrintPreviewService(
    production,
    templateId,
    type,
    entryId,
    formName
);

const templatePrintPreviewer = new TemplatePrintPreviewer(
    {
        container: "#preview",
    },
    printPreviewService,
    new PreviewService(production, templateId, type),
    new VariableService(production, templateId, type)
);

templatePrintPreviewer.createPreview();

import Parameter from "../../shared/Paramerter";
import PreviewService from "./service/PreviewService";
import PrintPreviewService from "./service/PrintPreviewService";
import VariableService from "./service/VariableService";

export default class TemplatePrintPreviewer {
    /**
     *
     * @param {*} container
     * @param {PrintPreviewService} printPreviewService
     * @param {PreviewService} previewService
     * @param {VariableService} variableService
     */
    constructor(
        { container },
        printPreviewService,
        previewService,
        variableService
    ) {
        this.config = {
            container: document.querySelector(`${container}`),
        };
        this.printPreviewService = printPreviewService;
        this.previewService = previewService;
        this.variableService = variableService;
        this.content = "";
        this.parameter;
        this.variables = [];
    }
    async createPreview() {
        await this.__getTemplate();
        await this.__getParameter();
        await this.__getVariables();
        await this.__previewContent();
        this.config.container.innerHTML = this.content;
    }
    async __previewContent() {
        const { success, content } = await this.previewService.preview(
            this.content,
            this.parameter,
            this.variables
        );

        if (success) {
            this.content = content;
        }
    }
    async __getTemplate() {
        const { success, data } = await this.printPreviewService.getTemplate();
        if (success) {
            this.content = data["template_content"];
            return;
        }

        new SnackBar({
            message: "Tempalte Not Found",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    async __getParameter() {
        const { success, data, message } =
            await this.printPreviewService.getFormDetailAsParameter();

        if (success) {
            this.parameter = Parameter.sanitizeAndGenerate(data);
            return;
        }
        new SnackBar({
            message,
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    async __getVariables() {
        const { success, variables } =
            await this.variableService.getTemplateVariables();
        if (success) {
            this.variables = variables;
        }
    }
}

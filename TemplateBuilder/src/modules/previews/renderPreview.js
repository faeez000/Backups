import { templateService } from "../../service/index.js";
import { templatePrintPreviewService } from "./service/index.js";

/**
 *
 * @param {string} templateId
 * @param {*[]} parameters
 * @param {HTMLDivElement} container
 */
export async function renderPreview(templateId, parameters = [], container) {
    const { success, variables } =
        await templatePrintPreviewService.getVariables(templateId, parameters);

    const { content } = await templateService.getTemplateContentByTemplateId(
        templateId
    );
    if (!success) {
        return;
    }

    container.innerHTML += `
    <div style="min-height: 98vh">
        ${await templatePrintPreviewService.generatePreview(content, variables)}
    </div>`;
}

import PreviewVariable from "../../../domain/ValueObject/PreviewVariable.js";
import { AXIOS_INSTANCE } from "../../../Global.js";

export default class TemplatePrintPreviewService {
    /**
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async getVariables(templateId, parameters = []) {
        try {
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE.post(
                `${this.baseURL}/preview/${templateId}/variables`,
                parameters,
                {
                    withCredentials: true,
                }
            );
            if (data.success) {
                return { success: true, variables: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
    /**
     * @param {string} content
     * @param {PreviewVariable[]} variables
     */
    async generatePreview(content, variables) {
        let tempContent = content;

        for (let variable of variables) {
            if (this.isSingleValueVariable(variable.variable_name, content)) {
                tempContent = tempContent.replace(
                    this.getSingleValueVariablePattern(variable.variable_name),
                    !!variable.variable_value[0]
                        ? variable.variable_value[0]["result"]
                        : variable.variable_value
                );
            } else {
                const rows = this.__createRows(variable.variable_value);

                tempContent = tempContent.replace(
                    this.getMultipleValueVariablePattern(
                        variable.variable_name
                    ),
                    rows
                );
            }
        }

        return tempContent;
    }
    /**
     * @private
     * @param {string} text
     * @returns RegExp
     */
    getSingleValueVariablePattern(text) {
        return new RegExp(`(?:\\{\\{)(${text})(?:\\}\\})`, "gm");
    }
    /**
     * @private
     * @param {string} text
     * @returns {RegExp}
     */
    getMultipleValueVariablePattern(text) {
        return new RegExp(`<!--(${text})-->`, "gm");
    }
    /**
     * @private
     * @param {string} variableName
     * @param {string} text
     */
    isSingleValueVariable(variableName, text) {
        return this.getSingleValueVariablePattern(variableName).test(text);
    }
    __createRows(data = []) {
        const container = document.createElement("div");
        data.map((item) => {
            const tr = document.createElement("tr");

            for (const [, value] of Object.entries(item)) {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            }
            container.appendChild(tr);
        });
        return container.innerHTML;
    }
}

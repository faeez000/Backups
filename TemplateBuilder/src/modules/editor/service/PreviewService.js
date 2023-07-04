import { AXIOS_INSTANCE } from "../../../Global.js";

export default class PreviewService {
    constructor(baseUrl, templateId, type) {
        this.baseUrl = baseUrl;
        this.templateId = templateId;
        this.type = type;
    }

    async preview(content, parameters, variables = []) {
        try {
            const validUsedVariables = this.__findValidUsedVariablesFrom(
                content,
                variables
            );

            const response = await AXIOS_INSTANCE.post(
                `${this.baseUrl}/preview/${this.templateId}?type=${this.type}`,
                { variables: validUsedVariables, parameters },
                { withCredentials: true }
            );
            if (response.data.success) {
                return {
                    success: true,
                    content: this.__replaceVariablesWithValues(
                        content,
                        response.data.data
                    ),
                };
            }
            return {
                success: false,
                content: this.__replaceVariablesWithValues(
                    content,
                    response.data.data
                ),
            };
        } catch {
            return { success: false };
        }
    }
    __findValidUsedVariablesFrom(content = "", variables = []) {
        const validUsedVariables = [];

        variables.forEach((variable) => {
            const singleValuePattern = new RegExp(
                "(?:\\{\\{)(" + variable["variable_name"] + ")(?:\\}\\})",
                "gm"
            );
            const tablePattern = new RegExp(
                `<!--(${variable["variable_name"]})-->`,
                "gm"
            );

            if (
                singleValuePattern.test(content) ||
                tablePattern.test(content)
            ) {
                validUsedVariables.push(variable);
            }
        });
        return validUsedVariables;
    }

    __replaceVariablesWithValues(content = "", variables = []) {
        variables.forEach((variable) => {
            const isTable = this.__isArray(variable["variable_value"]);

            if (isTable) {
                const tablePattern = new RegExp(
                    `<!--(${variable["variable_name"]})-->`,
                    "gm"
                );
                const rows = this.__createRows(variable["variable_value"]);
                content = content.replace(tablePattern, rows);
            } else {
                const singleValuePattern = new RegExp(
                    "(?:\\{\\{)(" + variable["variable_name"] + ")(?:\\}\\})",
                    "gm"
                );
                if (variable["variable_value"].length > 0) {
                    content = content.replace(
                        singleValuePattern,
                        variable["variable_value"][0]["result"]
                    );
                }
            }
        });
        return content;
    }
    __isArray(data) {
        return data.length >= 1 ? true : false;
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

import Sanitizer from "../../../shared/Sanitizer.js";
import { variableService } from "../service/index.js";

const sanitizer = new Sanitizer();

export const createVariableDialogConfig = {
    title: "Create New Variable",
    body: {
        type: "panel",
        items: [
            {
                type: "input",
                name: "variable-name",
                label: "Variable Name",
            },
            {
                type: "textarea",
                name: "query",
                label: "Query",
            },
        ],
    },
    buttons: [
        {
            type: "cancel",
            text: "Close",
        },
        {
            type: "submit",
            text: "Save",
            primary: true,
        },
    ],
    onSubmit: async function (api) {
        const data = api.getData();

        const variableName = data["variable-name"],
            query = data["query"];
        if (sanitizer.trimWhiteSpace(variableName).length < 1) {
            new SnackBar({
                message: "variable name cannot be empty",
                status: "info",
                dismissible: true,
                timeout: 5000,
            });

            api.close();
            return;
        }

        const response = await variableService.exist(variableName);

        if (response.success) {
            new SnackBar({
                message: response.message,
                status: "info",
                dismissible: true,
                timeout: 5000,
            });

            api.close();

            return;
        }

        const { success, message } = await variableService.save({
            variable_name: variableName,
            variable_query: query,
        });

        api.close();

        if (success) {
            new SnackBar({
                message,
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
            // @ts-ignore
            tinymce.get("mytextarea").insertContent(`{{${variableName}}}`);
            return;
        }

        new SnackBar({
            message,
            status: "error",
            dismissible: true,
            timeout: 5000,
        });

        return;
    },
};

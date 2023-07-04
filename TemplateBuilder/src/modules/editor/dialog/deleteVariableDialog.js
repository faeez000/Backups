import { variableService } from "../service/index.js";

export const deleteVariableDialogConfig = {
    title: "Variables",
    body: {
        type: "panel",
        items: [],
    },
    buttons: [
        {
            type: "cancel",
            name: "closeButton",
            text: "Cancel",
        },
        {
            type: "submit",
            name: "delete",
            text: "Delete",
            primary: true,
        },
    ],
    initialData: {},
    onSubmit: async function (api) {
        const data = Object.entries(api.getData());
        const variables = [];
        data.forEach(([key, value]) => {
            if (value) {
                variables.push({ variable_name: key });
            }
        });

        if (variables.length < 1) {
            api.close();
            return;
        }
        const { success, message } = await variableService.deleteVariables(
            variables
        );

        if (success) {
            new SnackBar({
                message,
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
            api.close();

            return;
        }
        new SnackBar({
            message,
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        api.close();

        return;
    },
    size: "medium",
};

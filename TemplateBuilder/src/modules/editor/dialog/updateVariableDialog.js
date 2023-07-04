import { variableService } from "../service/index.js";

export const updateVariableDialogConfig = {
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
            name: "update",
            text: "Update",
            primary: true,
        },
    ],
    initialData: {},
    onSubmit: async function (api) {
        const data = Object.entries(api.getData());

        const { success, message } = await variableService.updateVariables(
            data
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

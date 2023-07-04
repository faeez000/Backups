import { scratchpadService } from "../service/index.js";

export const scratchPadDialogConfig = {
    title: "Scratchpad",
    body: {
        type: "panel",
        items: [
            {
                type: "input",
                name: "formName",
                label: "form name (read only)",
                disabled: true,
            },
            {
                type: "textarea",
                name: "parameters",
                label: "Parameters",
            },
        ],
    },
    buttons: [
        {
            type: "cancel",
            name: "closeButton",
            text: "Cancel",
        },
        {
            type: "submit",
            name: "Save",
            text: "Save",
            primary: true,
        },
    ],
    initialData: {},
    onSubmit: async function (api) {
        var { parameters } = api.getData();

        const { success, message } = await scratchpadService.save(parameters);

        if (success) {
            api.close();

            new SnackBar({
                message,
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
            return;
        }
        new SnackBar({
            message,
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
    },
    size: "large",
};

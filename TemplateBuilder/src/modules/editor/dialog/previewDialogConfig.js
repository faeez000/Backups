export const previewDialogConfig = {
    title: "preview",
    body: {
        type: "panel",
        items: [
            {
                name: "preview",
                type: "iframe",
                sandboxed: true,
            },
        ],
    },
    buttons: [
        {
            type: "cancel",
            name: "closeButton",
            text: "Close",
        },
    ],
    initialData: {
        preview: "",
    },

    size: "large",
};

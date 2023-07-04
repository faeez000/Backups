// @ts-ignore
tinymce.PluginManager.add("example", function (editor, url) {
    var openDialog = function () {
        return editor.windowManager.open({
            title: "Import Table",
            body: {
                type: "panel",
                items: [
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
            onSubmit: function (api) {
                var data = api.getData();
                /* Insert content when the window form is submitted */
                const wrapper = document.createElement("div");
                const content = `
                <div class="insert-table" data-query="${data.query}"></div>
                `;
                document.dispatchEvent(new Event("table-insert"));
                editor.insertContent(content);
                api.close();
            },
        });
    };
    /* Add a button that opens a window */
    editor.ui.registry.addButton("example", {
        icon: "import-table",
        tooltip: "Import Table",
        onAction: function () {
            /* Open window */
            openDialog();
        },
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    editor.ui.registry.addMenuItem("example", {
        text: "Example plugin",
        onAction: function () {
            /* Open window */
            openDialog();
        },
    });
    /* Return the metadata for the help plugin */
    return {
        getMetadata: function () {
            return {
                name: "Example plugin",
                url: "http://exampleplugindocsurl.com",
            };
        },
    };
});

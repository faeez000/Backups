import { previewPlugin } from "./plugins/index.js";
import {
    previewService,
    scratchpadService,
    variableService,
} from "./service/index.js";

import {
    createVariableDialogConfig,
    updateVariableDialogConfig,
    deleteVariableDialogConfig,
    previewDialogConfig,
    scratchPadDialogConfig,
} from "./dialog/index.js";
import Parameter from "../../shared/Paramerter.js";
import { variableList } from "./index.js";

export default class TemplateEditor {
    constructor(config, icons) {
        this.config = config;
        this.icons = icons;
        // @ts-ignore
        this.editor;
    }
    setup({ content, parameter }) {
        scratchPadDialogConfig.initialData.parameters = parameter;
        let icons = this.icons;
        var toggleState = false;

        const editorSetup = {
            ...this.config,
            setup: function (editor) {
                editor.ui.registry.addButton("preview-content", {
                    icon: "preview",
                    onAction: async function (_) {
                        // @ts-ignore
                        const editorContent = await tinymce
                            .get("mytextarea")
                            .getContent({ format: "html" });

                        const hasVariable =
                            TemplateEditor.contentHasVariable(editorContent);
                        if (hasVariable) {
                            const parameters =
                                await scratchpadService.getParameters();

                            const sanitizedParameters =
                                Parameter.sanitizeAndGenerate(parameters);
                            const { success, content } =
                                await previewService.preview(
                                    editorContent,
                                    sanitizedParameters,
                                    variableList.get()
                                );
                            if (success) {
                                previewDialogConfig.initialData.preview =
                                    previewPlugin.createPreview(content);
                                editor.windowManager.open(previewDialogConfig);
                            }
                            return;
                        }
                        previewDialogConfig.initialData.preview =
                            previewPlugin.createPreview(editorContent);
                        editor.windowManager.open(previewDialogConfig);
                        return;
                    },
                });
                editor.ui.registry.addButton("scratchpad", {
                    icon: "paper",
                    tooltip: "Scratchpad",
                    onAction: async function (_) {
                        const parameters =
                            await scratchpadService.getParameters();
                        const formName = await scratchpadService.getFormName();

                        scratchPadDialogConfig.initialData.parameters =
                            parameters;
                        scratchPadDialogConfig.initialData.formName = formName;
                        editor.windowManager.open(scratchPadDialogConfig);
                    },
                });
                editor.ui.registry.addButton("delete-variable", {
                    text: "Delete Variable",
                    icon: "delete",
                    onAction: async function (_) {
                        const { success, variables } =
                            await variableService.getVariables();
                        let items = [];

                        if (success) {
                            items = variables.map((variable) => {
                                return {
                                    type: "checkbox",
                                    name: variable.variable_name,
                                    label: variable.variable_name,
                                };
                            });
                        }
                        deleteVariableDialogConfig.body.items = items;
                        editor.windowManager.open(deleteVariableDialogConfig);
                    },
                });
                editor.ui.registry.addButton("update-variable", {
                    text: "Update Variable",
                    icon: "update",
                    onAction: async function (_) {
                        const { success, variables } =
                            await variableService.getVariables();
                        let items = [];

                        const initialData = {};
                        if (success && variables.length > 0) {
                            items = variables.map((variable) => {
                                initialData[`${variable.variable_name}`] =
                                    variable.variable_query;
                                return {
                                    type: "textarea",
                                    name: variable.variable_name,
                                    label: variable.variable_name,
                                };
                            });
                        }

                        updateVariableDialogConfig.body.items = items;
                        updateVariableDialogConfig.initialData = initialData;
                        editor.windowManager.open(updateVariableDialogConfig);
                    },
                });
                editor.ui.registry.addButton("create-variable", {
                    icon: "add",
                    text: "Create Variable",
                    onAction: function (_) {
                        editor.windowManager.open(createVariableDialogConfig);
                    },
                });
                editor.ui.registry.addButton("save-content", {
                    icon: "save-content",
                    tooltip: "Save",
                    onAction: function (_) {
                        document.dispatchEvent(new Event("save-content"));
                    },
                });

                // testing
                // editor.ui.registry.addMenuButton("mybutton", {
                //     text: "My button",
                //     fetch: function (callback) {
                //         var items = [
                //             {
                //                 type: "menuitem",
                //                 text: "Menu item 1",
                //                 onAction: function () {
                //                     tinymce.activeEditor.formatter.toggle(
                //                         "custom_format"
                //                     );
                //                 },
                //             },
                //             {
                //                 type: "menuitem",
                //                 text: "Menu item 1",
                //                 onAction: function () {
                //                     editor.insertContent(
                //                         "&nbsp;<em>You clicked menu item 1!</em>"
                //                     );
                //                 },
                //             },
                //             {
                //                 type: "menuitem",
                //                 text: "Menu item 1",
                //                 onAction: function () {
                //                     editor.insertContent(
                //                         "&nbsp;<em>You clicked menu item 1!</em>"
                //                     );
                //                 },
                //             },
                //         ];
                //         callback(items);
                //     },
                // });

                //testing end

                editor.on("init", function (e) {
                    editor.setContent(content);
                });

                icons.forEach((icon) => {
                    editor.ui.registry.addIcon(icon.name, icon.value);
                });
                icons = null;
            },
        };
        // @ts-ignore
        return tinymce.init(editorSetup);
    }
    static contentHasVariable(content) {
        const variablePattern = new RegExp("{{(.*?)}}", "gm");
        const tableVariablePattern = new RegExp("<!--(.*?)-->", "gm");
        return (
            variablePattern.test(content) || tableVariablePattern.test(content)
        );
    }
}

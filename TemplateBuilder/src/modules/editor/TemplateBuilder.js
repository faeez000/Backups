import TemplateBuilderService from "./service/TemplateBuilderService.js";
import TemplateEditor from "../editor/TemplateEditor.js";

export default class TemplateBuilder {
    /**
     *
     * @param {TemplateEditor} templateEditor
     * @param {TemplateBuilderService} service
     * @param {string} header
     */
    constructor(templateEditor, service, header) {
        this.templateEditor = templateEditor;
        this.service = service;
        this.headerElement = document.querySelector(`${header}`);
    }
    async init() {
        this.__setupTemplateEditor();
        this.__listenToSaveContentEvent();
        this.__listentToKeyboardToSave();
    }
    async __setupTemplateEditor() {
        const data = await this.__loadEditorData();
        let [content, parameter] = ["", ""];

        if (!!data) {
            content = data["template_content"];
            parameter = data["template_parameter"];
        }

        this.templateEditor.setup({ content, parameter });
    }
    __listenToSaveContentEvent() {
        document.addEventListener("save-content", async () => {
            // tinymce globally accessible
            this.save(
                // @ts-ignore
                await tinymce.get("mytextarea").getContent({ format: "html" })
            );
        });
    }
    __listentToKeyboardToSave() {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                document.dispatchEvent(new Event("save-content"));
                return false;
            }
        });
    }
    __loadEditorContent() {
        // return this.service.getEditorContent();
        return "";
    }
    async __loadEditorData() {
        const { success, data } = await this.service.getEditorData();
        if (!success) {
            new SnackBar({
                message: "Failed to load editor content",
                status: "error",
                dismissible: true,
                timeout: 5000,
            });
            return null;
        }
        this.headerElement.textContent = data["template_name"];
        return data;
    }
    async save(data) {
        const { success, message } = await this.service.updateContent(data);

        if (!success) {
            new SnackBar({
                message,
                status: "error",
                dismissible: true,
                timeout: 5000,
            });
            return;
        }
        new SnackBar({
            message,
            status: "success",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
}

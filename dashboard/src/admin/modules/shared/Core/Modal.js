export default class Modal {
    constructor(id, appContainer, titleId) {
        this.id = id;
        this.title = "Header Title";
        this.titleId = titleId;
        this.appContainer = document.querySelector(`${appContainer}`);
        this.titleElement = null;
        this.container = null;
        this.dialog = null;
        this.content = null;
        this.header = null;
        this.body = null;
        this.footer = null;
    }
    create() {
        this.container = document.createElement("div");

        this.container.setAttribute("class", "modal fade bd-example-modal-lg");
        this.container.setAttribute("id", this.id);

        this._createHeader();
        this._createBody();
        this._createFooter();
        this._createContent();
        this._createDialog();

        this.container.appendChild(this.dialog);

        this.appContainer?.appendChild(this.container);
    }
    show() {
        $(`#${this.id}`).modal("show");
    }
    hide() {
        $(`#${this.id}`).modal("hide");
    }
    setTitle(value) {
        this.title = value;
        this.titleElement.textContent = value;
    }

    setFooter() {}
    setBody() {
        return this.body;
    }
    _createHeader() {
        const editIcon = document.createElement("i");
        this.header = document.createElement("div");
        this.titleElement = document.createElement("h5");

        editIcon.setAttribute("class", "bi bi-pencil-square");

        this.header.setAttribute("class", "modal-header");

        this.titleElement.setAttribute(
            "class",
            "modal-title dynamic-modal-title w-100 m-0"
        );
        this.titleElement.id = this.titleId;

        this.titleElement.setAttribute("contenteditable", "true");
        this.titleElement.style.outline = "none";
        this.titleElement.setAttribute("id", this.titleId);
        this.titleElement.textContent = this.title;

        this.header.appendChild(this.titleElement);
        this.header.appendChild(editIcon);
    }
    _createFooter() {
        this.footer = document.createElement("div");
        const cancelButton = document.createElement("a");

        cancelButton.setAttribute("type", "button");
        cancelButton.setAttribute("data-dismiss", "modal");
        cancelButton.setAttribute("class", "btn btn-link btn-sm cancel-btn");
        cancelButton.textContent = "Cancel";

        this.footer.appendChild(cancelButton);
        this.footer.appendChild(this.setFooter());

        this.footer.setAttribute("class", "modal-footer");
    }
    _createContent() {
        this.content = document.createElement("div");

        this.content.setAttribute("class", "modal-content");

        this.content.appendChild(this.header);
        this.content.appendChild(this.body);
        this.content.appendChild(this.footer);
    }
    _createDialog() {
        this.dialog = document.createElement("div");

        this.dialog.setAttribute("class", "modal-dialog modal-lg");

        this.dialog.appendChild(this.content);
    }
}

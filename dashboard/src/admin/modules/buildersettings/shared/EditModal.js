export default class EditModal {
    constructor({ id, nameInput, updateBtn }, name, service = null) {
        this.config = {
            id,
            nameInput: document.querySelector(`${nameInput}`),
            updateBtn: document.querySelector(`${updateBtn}`),
        };
        this.name = name;
        this.service = service;
    }
    _setValueAndAttribute(value, attribute) {
        this.config.nameInput.value = value;
        this.config.updateBtn.setAttribute(`data-${this.name}-id`, attribute);
    }
    show(name = "", id = "") {
        this._setValueAndAttribute(name, id);
        $(`${this.id}`).modal("show");
    }
    hide() {
        $(`${this.id}`).modal("hide");
    }
}

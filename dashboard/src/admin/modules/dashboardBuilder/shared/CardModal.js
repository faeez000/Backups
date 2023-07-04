import Modal from "../../shared/Core/Modal.js";
import { dashboardService } from "../../../../service/index.js";

export default class CardModal extends Modal {
    constructor(id, appContainer, titleId) {
        super(id, appContainer, titleId);
        this.cardProperty = {
            name: "",
            text: "",
            value: "",
            query: "",
            icon: "",
            iconColor: "",
        };
        this.card = null;
    }
    setCardProperty(property, card) {
        this.card = card;
        if (!!property) {
            this.cardProperty = property;
            document.querySelector("#card-text").value = this.cardProperty.text;
            document.querySelector(
                "#card-value"
            ).value = this.cardProperty.value;
            document.querySelector("#card-icon").value = this.cardProperty.icon;
            document.querySelector(
                "#card-icon-color"
            ).value = this.cardProperty.iconColor;
            document.querySelector(
                "#card-query"
            ).value = this.cardProperty.query;
            document.querySelector(
                `#${this.titleId}`
            ).textContent = this.cardProperty.name;
        }
    }
    setFooter() {
        return this._createSaveButton();
    }

    _createSaveButton() {
        const button = document.createElement("button");

        button.setAttribute("class", "btn btn-custom-sm btn-success btn-sm");
        button.setAttribute("id", "save-card");
        button.textContent = "Save";

        button.addEventListener("click", async () => {
            const text = document.querySelector("#card-text").value;
            const value = document.querySelector("#card-value").value;
            const icon = document.querySelector("#card-icon").value;
            const query = document.querySelector("#card-query").value;
            const iconColor = document.querySelector("#card-icon-color").value;
            const name = document.querySelector(`#${this.titleId}`).textContent;

            this.card.property["text"] = text ?? "empty";
            this.card.property["value"] = value;
            this.card.property["icon"] = icon;
            this.card.property["query"] = query;
            this.card.property["iconColor"] = iconColor;
            this.card.property["name"] = name;


            const { success, msg } = await dashboardService.updateCard({
                uniqueId: this.card.uniqueId,
                property: this.card.property,
            });

            

            if (success) {
                document.querySelector(
                    `[card-unique-id='${this.card.uniqueId}'] p`
                ).textContent = name;

                new SnackBar({
                    message: msg,
                    status: "success",
                    dismissible: true,
                    timeout: 5000,
                });

                this.hide();
                this.card = null;

            } else {
                new SnackBar({
                    message: msg,
                    status: "error",
                    dismissible: true,
                    timeout: 5000,
                });
            }

               
        });

        return button;
    }

    _createBody() {
        const container = document.createElement("div");
        const fieldForm = document.createElement("div");
        const formSection = document.createElement("div");
        this.body = document.createElement("div");

        fieldForm.setAttribute("class", "field-form");

        formSection.setAttribute(
            "class",
            "col-lg-8 col-md-8 col-sm-12 form-section"
        );

        this.body.setAttribute("class", "modal-body");

        formSection.appendChild(
            this._createFieldGroup(
                "Text",
                "card-text",
                "text",
                this.cardProperty.text
            )
        );
        formSection.appendChild(
            this._createFieldGroup(
                "Value",
                "card-value",
                "value",
                this.cardProperty.value
            )
        );
        formSection.appendChild(
            this._createFieldGroup(
                "Query",
                "card-query",
                "query",
                this.cardProperty.query,
                "textarea"
            )
        );
        formSection.appendChild(
            this._createFieldGroup(
                "Icon",
                "card-icon",
                "icon",
                this.cardProperty.icon
            )
        );
        formSection.appendChild(
            this._createFieldGroup(
                "Icon color",
                "card-icon-color",
                "iconColor",
                this.cardProperty.iconColor
            )
        );

        fieldForm.appendChild(formSection);
        container.appendChild(fieldForm);

        this.body.appendChild(container);
    }

    _createFieldGroup(label, id, name, value, typeOFBox) {
        const formGroup = document.createElement("div");
        const left = document.createElement("div");
        const right = document.createElement("div");
        const labelElement = document.createElement("label");
        const type = typeOFBox ?? "input"
        const input = document.createElement(type);

        formGroup.setAttribute("class", "form-group");

        left.setAttribute("class", "left");
        right.setAttribute("class", "right");
        labelElement.setAttribute("for", id);
        labelElement.textContent = label;

        if (name === "iconColor") {
            input.setAttribute("type", "color");
            input.setAttribute("class", "form-control btn-sm");
            input.style.padding = "8px !important";
        } else {
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control btn-sm");
        }
        input.setAttribute("id", id);
        input.setAttribute("name", name);
        input.value = value;

        left.appendChild(labelElement);
        right.appendChild(input);

        formGroup.appendChild(left);
        formGroup.appendChild(right);

        return formGroup;
    }
   
}

import Modal from "../../shared/Core/Modal.js";
import { dashboardService } from "../../../../service/index.js";

export default class ReportModal extends Modal {
    constructor(id, appContainer, titleId) {
        super(id, appContainer, titleId);
        this.property = {
            name: "",
            reportName: "",
            query: "",
        };
        this.card = null;

     

    }
    setCardProperty(property, card) {
        this.card = card;
        if (!!property) {
            this.property = property;
            document.querySelector(
                "#report-name"
            ).value = this.property.reportName;
            document.querySelector("#report-query").value = this.property.query;
            document.querySelector(
                `#${this.titleId}`
            ).textContent = this.property.name;
        }
    }
    setFooter() {
        return this._createSaveButton();
    }

    _createSaveButton() {
        const button = document.createElement("button");

        button.setAttribute("class", "btn btn-custom-sm btn-success btn-sm");
        button.setAttribute("id", "save-report");
        button.textContent = "Save";

        button.addEventListener("click", async () => {
            const reportName = document.querySelector("#report-name").value;
            const query = document.querySelector("#report-query").value;
            const name = document.querySelector(`#${this.titleId}`).textContent;

            this.card.property["reportName"] = reportName;
            this.card.property["query"] = query;
            this.card.property["name"] = name;

            const { success, msg } = await dashboardService.updateReportCard({
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
                "Report Name",
                "report-name",
                "text",
                this.property.reportName
            )
        );
        formSection.appendChild(
            this._createFieldGroup(
                "Query",
                "report-query",
                "query",
                this.property.query, 
                "textarea"
            )
        );

        fieldForm.appendChild(formSection);
        container.appendChild(fieldForm);

        this.body.appendChild(container);
    }

    _createFieldGroup(label, id, name, value, typeOfBox) {
        const formGroup = document.createElement("div");
        const left = document.createElement("div");
        const right = document.createElement("div");
        const labelElement = document.createElement("label");
        const type = typeOfBox ?? "input"
        const input = document.createElement(type);

        formGroup.setAttribute("class", "form-group");

        left.setAttribute("class", "left");
        right.setAttribute("class", "right");
        labelElement.setAttribute("for", id);
        labelElement.textContent = label;

        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control btn-sm");
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

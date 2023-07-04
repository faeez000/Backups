import Modal from "../../shared/Core/Modal.js"
import { dashboardService } from "../../../../service/index.js";

export default class ChartModal extends Modal{
    constructor(id, appContainer, titleId) {
        super(id, appContainer, titleId);
        this.property={
            name:"",
            text:"",
            query:"",
            value:"" 
        }
        this.card =null;
    } 


    setCardProperty(property, card) {
        this.card = card;
        if (!!property) {
            this.property = property;
            document.querySelector(
                "#chart-name"
            ).value = this.property.text;
            document.querySelector("#chart-query").value = this.property.query;
            
            document.querySelector( `#${this.titleId}`).textContent = this.property.name;

            document.querySelector("#chart-type").value = this.property.value
        }
    }


    setFooter() {
        return this._createSaveButton();
    }

    _createSaveButton() {
        const button = document.createElement("button");

        button.setAttribute("class", "btn btn-custom-sm btn-success btn-sm");
        button.setAttribute("id", "save-chart");
        button.textContent = "Save";

        button.addEventListener("click", async () => {
            const chartName = document.querySelector("#chart-name").value;
            const query = document.querySelector("#chart-query").value;
            const name = document.querySelector(`#${this.titleId}`).textContent;
            const chartType = document.querySelector("#chart-type").value;

            this.card.property["text"] = chartName;
            this.card.property["query"] = query;
            this.card.property["name"] = name;
            this.card.property["value"] = chartType;

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
        const dataForDropDown = ["line","bar","pie","doughnut","radar"]
        this.body = document.createElement("div");

        fieldForm.setAttribute("class", "field-form");

        formSection.setAttribute(
            "class",
            "col-lg-8 col-md-8 col-sm-12 form-section"
        );

        this.body.setAttribute("class", "modal-body");

        formSection.appendChild(
            this._createFieldGroup(
                "Chart Name",
                "chart-name",
                "text",
                this.property.text,

            )
        );
      

        formSection.appendChild(
            this._createDropdownFieldgroup(
                "Chart Type",
                "chart-type",
                "chartType",
                dataForDropDown,
                this.property.value
            )
        )
        formSection.appendChild(
            this._createFieldGroup(
                "Query",
                "chart-query",
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


    _createDropdownFieldgroup(label,id, name, optionValues,value){
        const formGroup = document.createElement("div");
        const left = document.createElement("div");
        const right = document.createElement("div");
        const labelElement = document.createElement("label");
        const select = document.createElement("select");
       
        left.setAttribute("class", "left");
        right.setAttribute("class", "right");
        formGroup.setAttribute("class", "form-group");
        labelElement.setAttribute("for", id);
        labelElement.textContent = label;


        select.setAttribute("id",id);
        select.setAttribute("name",name);
        select.setAttribute("class","selectelement form-control");

        for(let indexvalue of optionValues ){
            const option = document.createElement("option");

            option.setAttribute("value", indexvalue);
            const indexValueUppercase = indexvalue[0].toUpperCase() + indexvalue.substring(1);
            option.textContent = indexValueUppercase
            select.appendChild(option);
        }

        select.value = value

        left.appendChild(labelElement);
        right.appendChild(select);

        formGroup.appendChild(left);
        formGroup.appendChild(right);

        return formGroup;
    }

}
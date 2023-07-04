import Table from "../../../shared/helper/Table.js";
import Card from "../Card.js";
import { reportModal, tableLoder } from "../../shared/index.js";
import { dashboardQueryService } from "../../../../../service/index.js";
import DashboardQueryModel from "../model/DashboardQueryModel.js";
export default class Report extends Card {
    constructor(property, uniqueId = null) {
        super(property, reportModal, uniqueId);

        this.tableLoader = tableLoder;
    }

    async toHTML() {
        const queryStructure = new DashboardQueryModel(this.property.query)
        const  {success, data}  = await dashboardQueryService.fetchTableReport(queryStructure);


        const container = document.createElement("div");
        const h5 = document.createElement("h5");
        const reportNameContainer = document.createElement("div");
        const errorElement = document.createElement("div")

        reportNameContainer.setAttribute("class", "w-100");
        reportNameContainer.style.marginTop = "10px";
        h5.textContent = this.property.reportName;
        h5.setAttribute("class","preview-tag")
        reportNameContainer.appendChild(h5);
        container.setAttribute(
            "class",
            `col-lg-${this.property.col} col-md-${this.property.col} col-sm-12 mb-4`
            );
            
            container.appendChild(reportNameContainer);

        if(success){
            const tableConfig = {
                htmlClass: "table table-hover table-sm",
            };
            
            const table = new Table(data, tableConfig).create();
            table.id = this.uniqueId;
        // const columns = Object.keys(data[0]).map((item) => {
            //     return { data: item };
            // });
            
            this.tableLoader.addTable({ id: this.uniqueId, data });
            
            container.appendChild(table);
            
            
            return container;
        }else{
            errorElement.textContent="Invalid Format"
            errorElement.setAttribute("class", "text-danger")
            errorElement.style.fontWeight ="600";
            errorElement.style.height ="7rem";
            errorElement.style.marginTop="61px";
            errorElement.style.display ="flex";
            errorElement.style.justifyContent ="center";
            errorElement.style.alignItems ="center";
            errorElement.style.boxShadow ="rgb(0 0 0 / 15%) 0px 4px 12px"
            container.appendChild(errorElement)
            return container
        }
    }

}

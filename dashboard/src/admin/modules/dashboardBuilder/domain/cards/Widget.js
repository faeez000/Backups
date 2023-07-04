import Card from "../Card.js";
import { cardModal } from "../../shared/index.js";
import { dashboardQueryService } from "../../../../../service/index.js";
import DashboardQueryModel from "../model/DashboardQueryModel.js";

export default class Widget extends Card {
    constructor(property, uniqueId = null) {
        super(property, cardModal, uniqueId);
    }
    async toHTML() {
        
        const queryStructure = new DashboardQueryModel(this.property.query)


        const {success, data} = await dashboardQueryService.fetchTableWidget(queryStructure);

        const mainContainer = document.createElement("div");
        const cardContainer = document.createElement("div");
        const cardLeftSection = document.createElement("div");
        const cardRightSection = document.createElement("div");
        const errorElement = document.createElement("div");

        mainContainer.setAttribute(
            "class",
            "col-lg-3 col-md-6 col-sm-6 dashboard-card"
            );
            cardContainer.setAttribute("class", "card-container");
            cardLeftSection.setAttribute("class", "card-left-section");
            cardRightSection.setAttribute("class", "card-right-section");
            const p = document.createElement("p");
            const h5 = document.createElement("h5");
            const i = document.createElement("i");
    
        if(success){
            const countData = data.data["Count"] ?? "Format Error!"
            p.textContent = this.property.text;
            h5.innerHTML = countData;
            h5.setAttribute("class",`${countData === "Format Error!" ? "text-danger":""}`)
            h5.style.fontSize=`${countData === "Format Error!" ?"1rem":""}`
            i.setAttribute("class", this.property.icon);
            i.style.color = this.property.iconColor;
            // cardContainer.style.height="4.75rem"
                
            cardLeftSection.appendChild(p);
            cardLeftSection.appendChild(h5);
    
            cardRightSection.appendChild(i);
    
            cardContainer.appendChild(cardLeftSection);
            cardContainer.appendChild(cardRightSection);
    
            mainContainer.appendChild(cardContainer);
    
            return mainContainer;

        }else{
            errorElement.textContent="Invalid Format!"
            errorElement.setAttribute("class","text-danger")
            errorElement.style.fontWeight="600"
            cardContainer.appendChild(errorElement)
            cardContainer.style.height="4.75rem"
            cardContainer.style.display="flex"
            cardContainer.style.justifyContent="center"
            cardContainer.style.alignItems="center"
            mainContainer.appendChild(cardContainer)
            return mainContainer;
            }
    }

    
}

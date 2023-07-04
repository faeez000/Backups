
export default class PreviewList {
    constructor({ listContainer, searchbar }, name, service) {
        this.config = {
            container: document.getElementById(listContainer),
            searchBar: document.querySelector(searchbar)
        };
        this.name = name;
        this.service = service;
       
    }

    async loadinglist() {
        this.config.container.innerHTML = "";

        const { success, items } = await this.service.fetch();

        if (!success) {
            new SnackBar({
                message: "Failed to load",
                status: "error",
                dismissible: true,
                timeout: 5000,
            });
            this.config.container.appendChild(this._errorInLoadingRefresh())
            return;
        }

        items.forEach((item) => {
            this.config.container.appendChild(
                this.creatingElement(
                    item[`${this.name}_name`],
                    item[`${this.name}_id`]
                )
            );
        });
        if (items.length === 0) {
            this.config.container.appendChild(this._emptyContainer());
        }
    }

    creatingElement(name, id) {

        const encode =  encodeURIComponent(name)
        const url = `dashboard-report-list/dashboard-report?${this.name}_id=${id}&dashboardName=${encode}`;
        
        const container= document.createElement("div")
        container.setAttribute("class", "col-11 element-preview bg-light searchDashboard")
        container.setAttribute("data-dashboardName",name)

        const innerContainer = document.createElement("div");
        innerContainer.setAttribute("class","element-preview-name");
        
        const i = document.createElement("i")
        i.setAttribute("class","bi bi-border-style preview-list-icon");
        
        const a = document.createElement("a");
        a.setAttribute("href",url);
        a.textContent = name;
        a.addEventListener("click",()=>{
            this.config.searchBar.value =""
        })
        
        innerContainer.appendChild(i)
        innerContainer.appendChild(a)
        container.appendChild(innerContainer)

        return container
    }
     


    _emptyContainer() {
        const container = document.createElement("div");
        const aTag = document.createElement("a");
        const aContainer= document.createElement("div");
        container.setAttribute(
            "class",
            "text-center justify-content-center mt-5 text-secondary  col-12"
        );
        container.style.paddingTop = "15px";
        container.style.fontSize = "25px";
        container.style.display = "block";
        container.textContent = "No DashBoard To Show!";
        aTag.setAttribute("class", "text-center text-secondary");
        aTag.setAttribute("href", "/dashboard-builder-list");
        aTag.textContent = "Go To Dashboard Builder";
        aContainer.style.display = "flex";   
        aContainer.style.justifyContent = "center";   
        aTag.style.fontSize = "15px";   
        aTag.style.textDecoration = "none ";
        aContainer.appendChild(aTag);
        container.appendChild(aContainer);
        return container;
    }

    _errorInLoadingRefresh(){
        const container = document.createElement("div");
        const pTag = document.createElement("p");
        const aTag = document.createElement("a");

        container.setAttribute(
            "class",
            "text-center justify-content-center mt-5 text-secondary  col-12"
        );
        container.style.paddingTop = "15px";
        container.style.fontSize = "25px";
        container.textContent = "Failed To Load!";
        pTag.setAttribute("class", "text-center text-secondary ");
        pTag.textContent = "Refresh Page";

        pTag.style.fontSize = "15px";   
        pTag.style.cursor = "pointer";   
        pTag.style.textDecoration = "1px underline ";
        
        aTag.setAttribute("href","/dashboard-report-list")
        aTag.appendChild(pTag);
        container.appendChild(aTag);
        return container;
    }

}

export default class HeaderSearcher{
    constructor(id, search, builder ){
        this.element = document.getElementById(id)
        this.search = search 
        this.builder = builder ?? false      
    }
    
    _setHeaderName(){
        const url = new URLSearchParams(window.location.search);
        if(url.has(this.search)){

            const data = url.get(this.search)
            this.element.textContent = data;
           
            if(!this.builder){
                this.element.classList.add("preview-name-change-tag")
                const backElement = this._createBackButton()
                this.element.prepend(backElement)
            }
        }
    }

    _createBackButton(){
        const span = document.createElement("span");
        const i = document.createElement("i");
        const anchorTag = document.createElement("a");
        const url = "/dashboard-report-list";

        anchorTag.setAttribute("href",url)
        anchorTag.setAttribute("class","back-to-preview-list")
        i.setAttribute("class","bi bi-arrow-left-short")
        
    
        anchorTag.appendChild(i);
        span.appendChild(anchorTag)
        
        return span;

    }
    _returnDashboardName(){
        // const url = new URLSearchParams(window.location.search);
        // const data = url.get(this.search)
        const data = this.element.textContent
        return data
    }
}
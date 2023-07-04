import Previewer from "../shared/Core/Previewer.js";

export default class DashboardPreviewer extends Previewer {
    constructor(config) {
        super(config);
    }
    async _render() {


      



        this.previewSection.innerHTML = "";
        const container = document.createElement("div");
        container.setAttribute("class", "row w-100 flex-row-center-center");
        if(this.blocks.length===0){
        this.previewSection.innerHTML = "";

            container.appendChild(this._noBlockPresent())

        }
        for (let block of this.blocks) {
            
            const previewBlock = document.createElement("div");

            previewBlock.setAttribute(
                "class",
                "col-lg-11 col-md-11 col-sm-12 dashboard-preview-block flex-row-center-start"
            );
            for (let card of block.cards) {
                if (
                    card.property?.text?.length > 0 ||
                    card.property?.reportName?.length > 0
                ) {
                    previewBlock.appendChild(await card.toHTML());
                }
            }

            container.appendChild(previewBlock);
            
        }

        this.previewSection.appendChild(container);
    }


    

}

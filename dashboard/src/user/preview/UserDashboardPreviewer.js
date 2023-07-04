import HeaderSearcher from "../../shared/HeaderSearcher.js";
import QueryParser from "../../shared/queryParser.js";

export default class UserDashboardPreviewer {
    constructor({ previewContainer }, service, loader) {
        this.previewContainer = document.querySelector(`${previewContainer}`);
        this.blocks = [];
        this.service = service;
        this.loader = document.querySelector(loader);
    }

    async init() {
        // const { success, blocks } = await this._getBlocks();
        const { success, blocks } = await this.service.fetch();
        if (!success) {
            this.previewContainer.prepend(this._errorInLoadingRefresh());
            this.loader.remove();
        }
        if (success) {
            this.blocks = blocks;
            await this._render();
            this.loader.remove();
            return;
        }
        return;
    }

    async _render() {
        // this.previewContainer.innerHTML = "";
        const container = document.createElement("div");
        container.setAttribute("class", "row w-100 flex-row-center-center");

        for (let block of this.blocks) {
            const previewBlock = document.createElement("div");
            previewBlock.setAttribute(
                "class",
                "col-lg-12 col-md-12 col-sm-12 dashboard-preview-block flex-row-center-start"
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
        this.previewContainer.appendChild(container);
    }

    _errorInLoadingRefresh() {
        const dashboard_id = QueryParser.getValueOf("dashboard_id");

        const header = new HeaderSearcher("dashboardNameId", "dashboardName");
        const headerName = header._returnDashboardName();

        const container = document.createElement("div");
        const pTag = document.createElement("p");
        const aTag = document.createElement("a");

        const url = `/dashboard-report-list/dashboard-report?dashboard_id=${dashboard_id}&dashboardName=${headerName}`;
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

        aTag.setAttribute("href", url);
        aTag.appendChild(pTag);
        container.appendChild(aTag);
        return container;
    }

    async;
}

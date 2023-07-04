import Builder from "../shared/Core/Builder.js";
import { dashboardService } from "../../../service/index.js";
export default class DashboardBuilder extends Builder {
    constructor(config, store, service, modal, previewer = null) {
        super(config, store, service, previewer);
        this.modal = modal;
    }
    async load() {
        this.execute();
        await this.loadExistingBlocks();
    }



    async handleDropped(Block) {
        const index = this.dropSection.childNodes.length;

        const block = new Block();

        block.updateIndex(index);

        const { success, msg } = await this.service.save(block);
        if (success) {
            this.dropSection.appendChild(block.render());
            this.blocks.push(block);

            new SnackBar({
                message: "New block added",
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
        } else {
            new SnackBar({
                message: msg,
                status: "error",
                dismissible: true,
                timeout: 5000,
            });
        }
    }

    async loadExistingBlocks() {

        const { success, blocks, msg } = await dashboardService.fetch();
        if (success) {
            
            this.blocks = blocks;
            this.blocks.forEach((block) => {
                this.dropSection.appendChild(block.render());
            });
        }
    }
}

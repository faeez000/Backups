
export default class Builder {
    constructor(config, store, service, previewer = null) {
        this.config = config;
        this.store = store;
        this.service = service;
        this.previewer = previewer;

        this.blocks = [];
        this.block = null;

        this.blockListSection = document.querySelector(
            `${config.blockListSection}`
        );
        this.dropSection = document.querySelector(`${config.dropSection}`);
        this.previewButton = document.querySelector(`${config.previewButton}`);
        this.updateOrderButton = document.querySelector(
            `${config.updateOrderButton}`

            );
    
        }
    load() {}
    execute() {
        this._listRegistedBlock();

        if (!!this.previewer) {
            this.previewer.init();
            this._attachViewMethodToPreviewButton();
        }

        this._addOnDragStartEventToAllRegisteredBlocks();
        this._addOnDragOverEventToDropSection();
        this._addOnDropEventToDropSection();

        this._makeDropSectionSortable();

        this._attachUpdateOrderMethodToUpdateOrderButton();
    }
    _attachViewMethodToPreviewButton() {
        this.previewButton.addEventListener("click", async () => {

            const { success, blocks } = await this.service.fetch();


            if (success) {
                this.previewer.view(blocks);
            }
        });
    }
    _listRegistedBlock() {
        this.store.getBlocks().forEach((block) => {
            const blockContainer = document.createElement("div");
            const blockName = document.createElement("span");
            const blockDragIcon = document.createElement("i");

            blockContainer.setAttribute("class", "col-12 form-field");
            blockContainer.setAttribute("draggable", "true");
            blockContainer.setAttribute("id", block.name);

            blockName.setAttribute("class", "w-100");
            blockName.textContent = block.name;

            blockDragIcon.setAttribute("class", "bi bi-grip-vertical icon");

            blockContainer.appendChild(blockName);
            blockContainer.appendChild(blockDragIcon);

            this.blockListSection.appendChild(blockContainer);
        });
    }
    _makeDropSectionSortable() {
        /**
     * Make sure you load following jquery and jquery-ui in html head.
     * 
     * https://code.jquery.com/jquery-1.12.4.js
       https://code.jquery.com/ui/1.12.1/jquery-ui.js
     */
        $(`${this.config.dropSection}`).sortable({
            deactivate: () => {
                this._reactToSorting();
            },
        });
        $(`${this.config.dropSection}`).disableSelection();
    }
    _addOnDragStartEventToAllRegisteredBlocks() {
        document
            .querySelectorAll(`${this.config.registeredBlock}`)
            .forEach((block) => {
                block.addEventListener("dragstart", this._onDragStart);
            });
    }
    _addOnDragOverEventToDropSection() {
        this.dropSection.addEventListener("dragover", this._onDragOver);
    }
    _addOnDropEventToDropSection() {
        this.dropSection.addEventListener("drop", this._onDrop.bind(this));
    }
    _onDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }
    _onDragOver(event) {
        event.preventDefault();
    }
    _onDrop(event) {
        event.preventDefault();

        this.block = null;

        const blockName = event.dataTransfer.getData("text");
        const Block = this.store.getBlockBy(blockName).value;

        this.handleDropped(Block);
    }
    /**
     * Its an abstract method. every extended Builder will have their own implementation
     * @param {*} Block
     */
    handleDropped(Block) {}

    _getBlocksWithIndex() {
        const blocks = [];
        const htmlBlocks = document.querySelectorAll("[block-unique-id]");

        htmlBlocks.forEach((block, index) => {
            blocks.push({
                block_id: block.getAttribute("block-unique-id"),
                block_index: index,
            });
        });

        return blocks;
    }
    _reactToSorting() {
        this._activateUpdateOrderButton();
    }
    _activateUpdateOrderButton() {
        this.updateOrderButton.removeAttribute("disabled");
    }
    _attachUpdateOrderMethodToUpdateOrderButton() {
        this.updateOrderButton.addEventListener(
            "click",
            this.updateOrder.bind(this)
        );
    }
    updateOrder() {
        const blocks = this._getBlocksWithIndex();

        this.service.updateOrder(blocks);
        this.updateOrderButton.setAttribute("disabled", "disabled");

        new SnackBar({
            message: "order updated",
            status: "success",
            dismissible: true,
            timeout: 5000,
        });
    }

}

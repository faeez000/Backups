import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { dashboardService } from "../../../../service/index.js";

export default class DashboardBlock {
    constructor(uniqueId = null) {
        this.uniqueId = !!uniqueId ? uniqueId : uuidv4();
        this.index = null;
        this.service = dashboardService;
        this.deleteElement = document.createElement("i");
        this.deleteModal = document.querySelector("#delete-dashboard-builder-modal");
        this.deleteButton = document.querySelector("#delete-builder-block-btn");
        
    }
    wrap(elements = []) {
        const wrapper = document.createElement("li");
        const actions = document.createElement("div");

        const elementWrapper = document.createElement("div");
        const dragIcon = document.createElement("i");

        wrapper.setAttribute("class", "wrapper template-wrapper w-100 col-12");
        wrapper.setAttribute("block-unique-id", this.uniqueId);

        elementWrapper.setAttribute(
            "class",
            "col-11 col-sm-10 w-100 element-wrapper template-element-wrapper h-100 custom-col"
        );

        actions.setAttribute(
            "class",
            "actions d-flex justify-content-between align-self-center"
        );

        dragIcon.setAttribute("class", "bi bi-grip-vertical");

        this.deleteElement.setAttribute(
            "class",
            "icon delete bi bi-trash-fill"
        );
        this.deleteElement.setAttribute("data-delete-unique-id", this.uniqueId);
        this.deleteElement.setAttribute("data-toggle","modal")

        this.deleteElement.addEventListener("click", (e)=>{this._openDeleteModal(this.uniqueId)});


        elements.forEach((element) => {
            elementWrapper.appendChild(element);
        });
        actions.appendChild(this.deleteElement);

        wrapper.appendChild(dragIcon);
        wrapper.appendChild(elementWrapper);
        wrapper.appendChild(actions);
        // this._attachDeleteMethodOnDeleteBtn()
        
        return wrapper;
    }
    updateIndex(value) {
        this.index = parseInt(value);
    }
    render() {}

    async delete(id) {


        const element = document.querySelector(`[data-delete-unique-id="${id}"]`)
        
            const { success } = await this.service.deleteBlockBy(id);
            if (success) {
                element.parentElement.parentElement.remove();

                new SnackBar({
                    message: "Successfully deleted",
                    status: "success",
                    dismissible: true,
                    timeout: 5000,
                });
            } else {
                new SnackBar({
                    message: "Failed to delete",
                    status: "error",
                    dismissible: true,
                    timeout: 5000,
                });
            }
            

            $(`#delete-dashboard-builder-modal`).modal(`hide`)
        }

    _openDeleteModal(id){
        this.deleteButton.setAttribute(`data-block-id`, id);
        $(`#delete-dashboard-builder-modal`).modal(`show`)
    }

    _attachDeleteMethodOnDeleteBtn(){
        this.deleteButton.addEventListener("click",(e)=>{
            this.delete(e.target.getAttribute("data-block-id"))
        })
        
    }

    
}

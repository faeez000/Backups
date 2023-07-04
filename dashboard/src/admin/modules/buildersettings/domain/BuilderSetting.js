import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class BuilderSetting {
    constructor(
        {
            container,
            createNewBtn,
            nameInput,             //dashboard-name
            editNameInput,
            updateBtn,
            searchbar,
            createNewModalId,
            editModalId,
            builderPage,
        },
        name,
        service ,
        modal ,
        deleteModal,
        type = null,
        ) {
            this.config = {
                container: document.querySelector(`${container}`),
                createNewBtn: document.querySelector(`${createNewBtn}`),
                form: document.getElementById(`${nameInput}`),
                editNameInput: document.querySelector(`${editNameInput}`),
            updateBtn: document.querySelector(`${updateBtn}`),
            searchBar : document.querySelector(`${searchbar}`),
            createNewModalId,
            editModalId,
            builderPage,
        };
        this.name = name;
        this.service = service;
        this.modal = modal;
        this.deleteModal= deleteModal,
        this.type = type;
    
    }
    

    init() {
        this.loadList();
        this._attachCreateMethodToCreateNewBtn();
        this._attachUpdateMethodToUpdateBtn();
        this._attachRemoveMethodToDeleteBtn()
    }
    



    async create(e) {
        // e.preventDefault();


        const formData = new FormData(this.config.form);
        let dashboard = {};

        dashboard["dashboard_id"] = uuidv4();

        for (var [key, value] of formData) {
            dashboard[key] = value.trim();
        }

        
        const { success, message } = await this.service.save(dashboard.dashboard_id, dashboard.dashboard_name);

        if (!success) {
            $(`${this.config.createNewModalId}`).modal("hide");
            new SnackBar({
                message,
                status: "info",
                dismissible: true,
                timeout: 5000,
            });

            return;
        }

        new SnackBar({
            message,
            status: "success",
            dismissible: true,
            timeout: 5000,
        });

        this.config.form.reset();

        $(`${this.config.createNewModalId}`).modal("hide");
        this.loadList();

        return;
    }
    async update(id) {
        const newName = this.config.editNameInput.value;
        
        // api for exist not working 
        
        // const result = await this.service.exist(newName);
        // if (result.success && result.exist) {
        //     new SnackBar({
        //         message: `"${newName}" Already exist`,
        //         status: "info",
        //         dismissible: true,
        //         timeout: 5000,
        //     });

        //     $(`${this.config.editModalId}`).modal("hide");
        //     this.config.editNameInput.value = "";
        //     return;
        // }

        const { success, message } = await this.service.update(id, newName);

        if (!success) {
            new SnackBar({
                message,
                status: "error",
                dismissible: true,
                timeout: 5000,
            });

            $(`${this.config.editModalId}`).modal("hide");
            return;
        } 
        new SnackBar({
            message,
            status: "success",
            dismissible: true,
            timeout: 5000,
        });

        $(`${this.config.editModalId}`).modal("hide");
        this.loadList();

        return;
    }

    async remove(id) {
        
            const { success, message } = await this.service.remove(id);

            if (!success) {
                if (message) {
                    new SnackBar({
                        message,
                        status: "error",
                        dismissible: true,
                        timeout: 5000,
                    });
                    this.deleteModal.hide()
                    return;
                }
                new SnackBar({
                    message,
                    status: "success",
                    dismissible: true,
                    timeout: 5000,
                });
                this.deleteModal.hide()
                return;
            }
            this.loadList();
          
            new SnackBar({
                message: "Successfully Deleted",
                status: "success",
                dismissible: true,
                timeout: 5000,
            });
            this.deleteModal.hide()

            return;
        
    }

    async loadList() {
        this.config.container.innerHTML = "";
        const { success, items } = await this.service.fetch();  

        if (!success) {
            new SnackBar({
                message: "Failed to load",
                status: "error",
                dismissible: true,
                timeout: 5000,
            });
            return;
        }
        
        items.forEach((item) => {
            this.config.container.appendChild(
                this._createNewItem(
                    item[`${this.name}_name`],
                    item[`${this.name}_id`]
                )
            );
        });

        if(items.length === 0){
            this.config.container.appendChild(this._emptyContainer())
        }
    }

    _emptyContainer(){
        const container = document.createElement("div");
        const pTag = document.createElement("p");
        
        container.setAttribute("class","text-center justify-content-center mt-5 text-secondary  col-12");
        container.style.paddingTop="15px";
        container.style.fontSize="25px";
        container.textContent ="No DashBoard To Show!"
        
        pTag.setAttribute("class","text-center text-secondary")
        pTag.textContent ="Create New DashBoard"
        pTag.setAttribute("data-toggle","modal")
        pTag.setAttribute("data-target","#create-new-dashboard-modal")
        pTag.style.cursor="pointer"
       
        pTag.style.fontSize = "15px"
        pTag.style.textDecoration = "1px underline "
        container.appendChild(pTag)
        return container
    }

    _createNewItem(name = "", id) {
        const itemContainer = document.createElement("div");
        const item = document.createElement("div");
        const nameElement = document.createElement("div");
        const itemActions = document.createElement("div");
        const deleteItem = document.createElement("i");
        const editItem = document.createElement("i");
        const itemLink = document.createElement("a");
        let url = "dashboard-builder-list/dashboard-editor";  
        
        
       
        if (!!this.type) {
            url = `${this.config.builderPage}?${this.name}_id=${id}&type=${this.type}`;
        } else {
            // url = `${this.config.builderPage}?${this.name}_id=${id}`;
            url = `dashboard-builder-list/dashboard-editor?${this.name}_id=${id}&${this.name}_name=${name}`;
        }

        
        itemLink.addEventListener("click",(e)=>{
            this.config.searchBar.value  =""
        })
        itemLink.setAttribute("href", url);
        itemLink.setAttribute("class", "flex-row-a");
        itemLink.textContent = name;

        nameElement.setAttribute("class", `${this.name}-name dashboard-card-strip`);

        deleteItem.setAttribute("class", "bi bi-trash-fill");
        deleteItem.style.marginRight = "4px";
        
        deleteItem.setAttribute("data-toggle", "modal");
        deleteItem.setAttribute("data-target", `${this.deleteModal.config.modalId}`);
        deleteItem.addEventListener("click", (e) => {
            this._attachDeleteModalToDeleteAction(id)
        });

        editItem.setAttribute("class", "bi bi-pencil-square");
        editItem.setAttribute("data-toggle", "modal");
        editItem.setAttribute("data-target", `${this.config.editModalId}`);
        editItem.addEventListener("click", () => { 
            this._attachEditModalToEditAction(name, id);
        });

        itemContainer.setAttribute("class","col-sm-12 col-md-6 col-lg-4 col-xl-3  item-container mt-4 searchDashboard ")
        itemContainer.setAttribute( "data-dashboardName",`${name}`);
       
       
        itemActions.setAttribute("class", "item-actions flex-row-end-center");
        itemActions.style.position="absolute"
        itemActions.style.right="0"
        itemActions.style.background="white"
        item.setAttribute("class", "item flex-row-between-center ");

        nameElement.appendChild(itemLink);

        itemActions.appendChild(deleteItem);
        itemActions.appendChild(editItem);

        item.appendChild(nameElement);
        item.appendChild(itemActions);
        itemContainer.appendChild(item);
        return itemContainer;

    }


    _attachEditModalToEditAction(name, id) {
        this.modal.show(name, id);
    }
    _attachCreateMethodToCreateNewBtn() {
            // this.config.form.addEventListener("submit", this.create.bind(this))
            this.config.createNewBtn.addEventListener("click",(e)=>{
                this.create(e)
            } )
    }
    _attachUpdateMethodToUpdateBtn() {
        this.config.updateBtn.addEventListener("click", (e) => {
            this.update(e.target.getAttribute(`data-${this.name}-id`));
        });
    }

    _attachDeleteModalToDeleteAction(id){
        this.deleteModal.show(id);
    }

    _attachRemoveMethodToDeleteBtn(){
        this.deleteModal.config.deleteBtn.addEventListener("click",(e)=>{
            this.remove(e.target.getAttribute(`data-${this.name}-id`))
        })
    }

    _validateName(name = "") {
        const noSpecialCharacterRegex = new RegExp("[^a-zA-Z0-9\\-\\s]+", "g");
        return name.match(noSpecialCharacterRegex) ? true : false;
    }


}

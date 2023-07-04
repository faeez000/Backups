export default class DeleteModal {
    constructor(
        {id, deleteBtn}, name 
    ){
        this.config= {
            modalId :id ,
            deleteBtn: document.querySelector(`${deleteBtn}`)
        }
        this.name= name
    }
    _setIdValue(id_value){
        this.config.deleteBtn.setAttribute(`data-${this.name}-id`,id_value)
    }

    show(id){
        this._setIdValue(id);
        $(`${this.config.modalId}`).modal(`show`);
    }

    hide(){
        $(`${this.config.modalId}`).modal("hide");
    }

}
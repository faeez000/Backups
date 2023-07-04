import ActionAndQueryModel from "../../../domain/ActionAndQueryModel.js";
import {fieldupdateservice} from '../../../services/index.js';
import{updateactionAndQueryForm,
  updateactionDropdown,
  updatequeryTextarea,
  updateNameTextbox,
  updateActionAndQueryBtn} from '../../../shared/elements.js';
import { startButtonLoader, stopButtonLoader } from "../../../utils/ui/loader.js";


    let formId, QueryID ;

    $("#Action-And-Query-Update-modal").on("show.bs.modal",async function (e) {
      e.stopPropagation()
        // @ts-ignore
        const el = $(e.relatedTarget)[0];
    
             formId = el.getAttribute("data-id");
             QueryID = el.getAttribute("id");

             document.getElementById('update-cancelBtn').setAttribute('data-id',formId)
        
    });

    

    updateactionAndQueryForm.addEventListener("submit", async(event)=>{ 
        event.preventDefault();

    
    startButtonLoader(updateActionAndQueryBtn);

    const formData = new FormData(updateactionAndQueryForm);

    const updatedActionAndQueryDetails = new ActionAndQueryModel(formId)

    for (const [key,value] of formData.entries(formData)){
     
      updatedActionAndQueryDetails[key] = value;
    }

    const {success,message} = await fieldupdateservice.UpdateActionAndQuery(updatedActionAndQueryDetails, QueryID);

    stopButtonLoader(updateActionAndQueryBtn, "Update");

    if (!success) {
      if(formId){

        document.getElementById('update-cancelBtn').setAttribute('data-id',formId)
      }
      // const {success, actionAndQuery} = await fieldupdateservice.getFieldUpdateActionAndQueryBy(formId)
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
        return false
    })   

    $('#Action-And-Query-Update-modal').on('show.bs.modal', async (e)=>{
      if(formId){

        document.getElementById('update-cancelBtn').setAttribute('data-id',formId)
      }
     
      event.preventDefault();
      e.stopPropagation()
      const {success,actionAndQuery} = await fieldupdateservice.GetUpdatingValuesBy(QueryID)

      if (success){
       
        updateNameTextbox.value = actionAndQuery[0].name;
        updateactionDropdown.value = actionAndQuery[0].action;
        updatequeryTextarea.value = actionAndQuery[0].query;
        return;
      }

      
     
      return ;
    });
        



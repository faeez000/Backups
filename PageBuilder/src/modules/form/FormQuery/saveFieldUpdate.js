import ActionAndQueryModel from "../../../domain/ActionAndQueryModel.js";
import {fieldupdateservice} from '../../../services/index.js';
import {actionAndQueryForm,saveActionAndQueryBtn} from '../../../shared/elements.js';
import { startButtonLoader, stopButtonLoader } from "../../../utils/ui/loader.js";


    let formId ;
    $("#Form-Field-Update-modal").on("show.bs.modal",async function (e) {
        // @ts-ignore
        const el = $(e.relatedTarget)[0];
    
             formId = el.getAttribute("data-id");
        
    });

    

    actionAndQueryForm.addEventListener("submit", async (e)=>{
        e.preventDefault()
        
        startButtonLoader(saveActionAndQueryBtn);

        const formData = new FormData(actionAndQueryForm);

        

        const actionAndQueryDetails = new ActionAndQueryModel(formId)

        // let ActionAndQuery = {}
        for (const [key,value] of formData.entries(formData)){
            actionAndQueryDetails[key] = value;
        }
        
        
        

        const {success,message} = await fieldupdateservice.saveActionAndQuery(actionAndQueryDetails)

        if (!success) {
            // const {success, actionAndQuery} = await fieldupdateservice.getFieldUpdateActionAndQueryBy(formId)
            stopButtonLoader(saveActionAndQueryBtn, "Save");
            if (!success) {
                new SnackBar({
                    message,
                    status: "info",
                    dismissible: true,
                    timeout: 5000,
                });
                return;
              }
            return;
        }
        stopButtonLoader(saveActionAndQueryBtn, "Save");

        new SnackBar({
            message,
            status: "success",
            dismissible: true,
            timeout: 5000,
          });
    
        // @ts-ignore
        e.target.reset();

        
      
          

        

    })



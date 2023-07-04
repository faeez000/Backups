import {elementActionService,
    formService} from "../../services/index.js";
import {redirectionValueDropdown, redirectionValueTextArea} from "../../shared/domElements.js"
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";



$(variables.redirectionModal).on("show.bs.modal",async (e)=>{

    const {success,action} = await elementActionService.getElementActionByElementId(variables.elementId);


    redirectionValueDropdown.innerHTML = ' ';
    redirectionValueTextArea.innerHTML = ' ';

    const RedirectionTypeDropdown = document.getElementById("redirection-Type-list");

    RedirectionTypeDropdown.addEventListener('change', async function (e){
        if(RedirectionTypeDropdown.value ==='Form'){

            redirectionValueTextArea.innerHTML = ' ';
            redirectionValueDropdown.disabled =false;
            redirectionValueTextArea.disabled=true;

            const {forms} = await formService.getSimpleAndGridForms();
            redirectionValueDropdown.innerHTML = ' ';
            forms.forEach(

                (form)=>{
                    redirectionValueDropdown.innerHTML += createOptions(form["form_name"]); 
                  
                }
            );
           
            return
            
        }
        if(RedirectionTypeDropdown.value ==='Ledger'){
            redirectionValueTextArea.innerHTML = ' ';
            redirectionValueDropdown.disabled =false;
            redirectionValueTextArea.disabled=true;

            const {reports} = await formService.getLedgerReport();
            redirectionValueDropdown.innerHTML = ' ';
            reports.forEach(

                (report)=>{
                    redirectionValueDropdown.innerHTML += createOptions(report["Report_Name"]); 
                   
                }

            );
         
            return
        } 
        if(RedirectionTypeDropdown.value ==='Url'){
            redirectionValueDropdown.innerHTML = ' ';
            redirectionValueDropdown.disabled =true;
            redirectionValueTextArea.disabled=false;
            return
        } 
         redirectionValueDropdown.innerHTML = ' ';
        

    })

        

    if(success){

        RedirectionTypeDropdown.value  = action.redirectType;
       
        
        if(RedirectionTypeDropdown.value === "Ledger"){

            redirectionValueTextArea.innerHTML = ' ';
            redirectionValueDropdown.disabled =false;
            redirectionValueTextArea.disabled=true;

            

            const {reports} = await formService.getLedgerReport();
            reports.forEach(

                (report)=>{
                    redirectionValueDropdown.innerHTML += createOptions(report["Report_Name"]); 
               
                }

            );
            redirectionValueDropdown.value = action.redirectValue; 
            return
        }
        if(RedirectionTypeDropdown.value === "Form"){

            redirectionValueTextArea.innerHTML = ' ';
            redirectionValueDropdown.disabled =false;
            redirectionValueTextArea.disabled=true;

          
            const {forms} = await formService.getSimpleAndGridForms();
            redirectionValueDropdown.innerHTML = ' ';
            forms.forEach(

                (form)=>{
                    redirectionValueDropdown.innerHTML += createOptions(form["form_name"]); 
                 
                }
            );

            redirectionValueDropdown.value = action.redirectValue; 
            return
        }
        if(RedirectionTypeDropdown.value === "Url"){
            
            redirectionValueDropdown.innerHTML = ' ';
            redirectionValueDropdown.disabled =true;
            redirectionValueTextArea.disabled=false;

            redirectionValueTextArea.value = action.redirectValue; 
            console.log('textarea',redirectionValueDropdown.value)
            return
        }
    return
    }

    RedirectionTypeDropdown.value = '';
    redirectionValueDropdown.value = '';
    redirectionValueTextArea.value = '';
    return
})
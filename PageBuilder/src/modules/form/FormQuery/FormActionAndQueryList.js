    import {actionAndQueryForm} from '../../../shared/elements.js';
    import {DeleteBtnCellRenderer,UpdateBtnCellRenderer} from './DeleteAndUpdateBtnCellRenderer.js';
    import ActionAndQueryModel from "../../../domain/ActionAndQueryModel.js";
    import {fieldupdateservice} from '../../../services/index.js';


    // var ActionAndQuery;

    var columnDefs = [
        {headerName:"Form_Id",field:'formId',hide:true},
        {headerName:'queryID',field:"queryID",hide:true},
        {headerName: "Name", field: "name",lockPosition: true,},
        {headerName: "Action", field: "action",lockPosition: true,},
        {headerName: "Query", field: "query",lockPosition: true,},
        {headerName:"", field:"",
        cellRenderer:UpdateBtnCellRenderer,
        maxWidth:90, lockPosition: true,},
        {headerName:"", field:"",
        cellRenderer:DeleteBtnCellRenderer,
        maxWidth:90, lockPosition: true,},
    ];
        
    // specify the data
    var rowData = [];
    $("#Form-Field-Update-modal").on("show.bs.modal", async function (e) {
        // @ts-ignore
        const el = $(e.relatedTarget)[0];
    
           const  formId = el.getAttribute("data-id");
         

           document.getElementById('cancelBtn').setAttribute('data-id',formId)

           

        const {success, actionAndQuery} = await fieldupdateservice.getFieldUpdateActionAndQueryBy(formId)
       
        

        if(!success){
            return;
        }

        rowData = actionAndQuery.ActionQueryList   
       
            gridOptions.api.setRowData(rowData)
        
    });
  


    var gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
    };
    

    document.addEventListener('DOMContentLoaded', function() {
        var gridDiv = document.querySelector('#formQueryGrid');
        new agGrid.Grid(gridDiv, gridOptions);
        gridOptions.api.setRowData(rowData)
    });


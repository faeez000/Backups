import {
    dataReferenceService,
    elementBuilderService
  } from "../../services/index.js";
  import {
    dataReferenceTableDropdown,
    dataReferenceTitleDropdown,
    dataReferenceSubtitleDropdown,
    dataReferenceImageDropdown
  } from "../../shared/domElements.js";
  import { variables } from "../../shared/variables.js";
  import { createOptions } from "../shared/components/createOptions.js";
  
  $(variables.dataReferenceModal).on("show.bs.modal", async function(e) {
   
    const { tables } = await elementBuilderService.getTables();
  
    const {
      success,
      detail
    } = await dataReferenceService.getDataReferenceDetailBy(
      variables.elementId
    );
  
    const { columns } = await elementBuilderService.getColumnsOf(
      success ? detail.tableColumn : tables[0]
    );
  
    dataReferenceTableDropdown.innerHTML = "";
    dataReferenceTitleDropdown.innerHTML = "";
    dataReferenceSubtitleDropdown.innerHTML = "";
    dataReferenceImageDropdown.innerHTML = "";
    
     tables.forEach(
      /**
           *
           * @param {string} table
           */
      table => {
        dataReferenceTableDropdown.innerHTML += createOptions(table);
      }
    );
  
    columns.forEach(
      /**
           *
           * @param {string} column
           */
      column => {
        dataReferenceTitleDropdown.innerHTML += createOptions(column);
        dataReferenceSubtitleDropdown.innerHTML += createOptions(column);
        dataReferenceImageDropdown.innerHTML += createOptions(column);
       
      }
    );
  
    if (success) {
     
      // @ts-ignore
      dataReferenceTableDropdown.value = detail.tableColumn;
  
      // @ts-ignore
      dataReferenceTitleDropdown.value = detail.titleColumn;
  
      // @ts-ignore
      dataReferenceSubtitleDropdown.value = detail.subtitle;
  
      // @ts-ignore
      dataReferenceImageDropdown.value = detail.imageColumn;
  
     
    }
  });
  
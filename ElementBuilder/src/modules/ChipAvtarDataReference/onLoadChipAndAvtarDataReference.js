import {
    chipAndAvtarDataReferenceService,
    elementBuilderService
  } from "../../services/index.js";
  import {
    chipAndAvtarDataReferenceTableDropdown,
    chipAndAvtarDataReferenceTitleDropdown,
    chipAndAvtarDataReferenceImageDropdown,
  } from "../../shared/domElements.js";
  import { variables } from "../../shared/variables.js";
  import { createOptions } from "../shared/components/createOptions.js";
  
  $(variables.chipAndAvtarDataReferenceModal).on("show.bs.modal", async function(e) {
   
    const { tables } = await elementBuilderService.getTables();
  
    const {
      success,
      detail
    } = await chipAndAvtarDataReferenceService.getChipAndAvtarDataReferenceDetailBy(
      variables.elementId
    );
  
    const { columns } = await elementBuilderService.getColumnsOf(
      success ? detail.tableColumn : tables[0]
    );
  
    chipAndAvtarDataReferenceTableDropdown.innerHTML = "";
    chipAndAvtarDataReferenceTitleDropdown.innerHTML = "";
    chipAndAvtarDataReferenceImageDropdown.innerHTML = "";
  
    tables.forEach(
      /**
           *
           * @param {string} table
           */
      table => {
        chipAndAvtarDataReferenceTableDropdown.innerHTML += createOptions(table);
      }
    );
  
    columns.forEach(
      /**
           *
           * @param {string} column
           */
      column => {
        chipAndAvtarDataReferenceTitleDropdown.innerHTML += createOptions(column);
        chipAndAvtarDataReferenceImageDropdown.innerHTML += createOptions(column);
       
      }
    );
  
    if (success) {
      // @ts-ignore
      chipAndAvtarDataReferenceTableDropdown.value = detail.tableColumn;
  
      // @ts-ignore
      chipAndAvtarDataReferenceTitleDropdown.value = detail.titleColumn;
  
      // @ts-ignore
      chipAndAvtarDataReferenceImageDropdown.value = detail.imageColumn;
   
      
    }
  });
  
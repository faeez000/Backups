import {
  cardDataReferenceService,
  elementBuilderService
} from "../../services/index.js";
import {
  cardDataReferenceTableDropdown,
  cardDataReferenceTitleDropdown,
  cardDataReferenceSubtitleDropdown,
  cardDataReferenceImageDropdown,
  cardDataReferenceDescriptionDropdown
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";

$(variables.cardDataReferenceModal).on("show.bs.modal", async function(e) {
 
  const { tables } = await elementBuilderService.getTables();

  const {
    success,
    detail
  } = await cardDataReferenceService.getCardDataReferenceDetailBy(
    variables.elementId
  );

  const { columns } = await elementBuilderService.getColumnsOf(
    success ? detail.tableColumn : tables[0]
  );

  cardDataReferenceTableDropdown.innerHTML = "";
  cardDataReferenceTitleDropdown.innerHTML = "";
  cardDataReferenceSubtitleDropdown.innerHTML = "";
  cardDataReferenceImageDropdown.innerHTML = "";
  cardDataReferenceDescriptionDropdown.innerHTML = "";

  tables.forEach(
    /**
         *
         * @param {string} table
         */
    table => {
      cardDataReferenceTableDropdown.innerHTML += createOptions(table);
    }
  );

  columns.forEach(
    /**
         *
         * @param {string} column
         */
    column => {
      cardDataReferenceTitleDropdown.innerHTML += createOptions(column);
      cardDataReferenceSubtitleDropdown.innerHTML += createOptions(column);
      cardDataReferenceImageDropdown.innerHTML += createOptions(column);
      cardDataReferenceDescriptionDropdown.innerHTML += createOptions(column);
    }
  );

  if (success) {
    // @ts-ignore
    cardDataReferenceTableDropdown.value = detail.tableColumn;

    // @ts-ignore
    cardDataReferenceTitleDropdown.value = detail.titleColumn;

    // @ts-ignore
    cardDataReferenceSubtitleDropdown.value = detail.subtitle;

    // @ts-ignore
    cardDataReferenceImageDropdown.value = detail.imageColumn;
 
    // @ts-ignore
    cardDataReferenceDescriptionDropdown.value = detail.descriptionColumn;
  }
});

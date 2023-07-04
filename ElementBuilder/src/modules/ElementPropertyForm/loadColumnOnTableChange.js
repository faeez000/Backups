import { elementBuilderService } from "../../services/index.js";
import {
    autoSuggestionColumnDropdown,
    autoSuggestionTableDropdown,
    columnDropdown,
    optionColumnDropdown,
    optionTableDropdown,
    tableDropdown,
    whereColumnDropdown,
    dataReferenceTableDropdown,
    cardDataReferenceTableDropdown,
    dataReferenceTitleDropdown, 
    dataReferenceSubtitleDropdown,
    dataReferenceImageDropdown,
    cardDataReferenceTitleDropdown,
    cardDataReferenceSubtitleDropdown, 
    cardDataReferenceImageDropdown,
    cardDataReferenceDescriptionDropdown,
    chipAndAvtarDataReferenceTableDropdown,
    chipAndAvtarDataReferenceTitleDropdown,
    chipAndAvtarDataReferenceImageDropdown,



} from "../../shared/domElements.js";
import { createOptions } from "../shared/components/createOptions.js";

loadColumnsOnTableChange(tableDropdown, [columnDropdown, whereColumnDropdown]);
loadColumnsOnTableChange(optionTableDropdown, [optionColumnDropdown]);
loadColumnsOnTableChange(autoSuggestionTableDropdown, [
    autoSuggestionColumnDropdown,
]);
loadColumnsOnTableChange(dataReferenceTableDropdown, [
    dataReferenceTitleDropdown, 
    dataReferenceSubtitleDropdown,
    dataReferenceImageDropdown,
]);
loadColumnsOnTableChange(cardDataReferenceTableDropdown, [
    cardDataReferenceTitleDropdown,
    cardDataReferenceSubtitleDropdown, 
    cardDataReferenceImageDropdown,
    cardDataReferenceDescriptionDropdown,
]);

loadColumnsOnTableChange(chipAndAvtarDataReferenceTableDropdown, [
    chipAndAvtarDataReferenceTitleDropdown,
    chipAndAvtarDataReferenceImageDropdown, 
]);






/**
 *
 * @param {string} table
 * @param {HTMLSelectElement[]} dropdowns
 * @returns {Promise<void>}
 */
async function getAndloadColumns(table, dropdowns) {
    const { columns } = await elementBuilderService.getColumnsOf(table);

    let options = "";

    for (let column of columns) {
        options += createOptions(column);
    }

    for (let dropdown of dropdowns) {
        dropdown.innerHTML = "";
        dropdown.innerHTML += options;
    }
}

/**
 *
 * @param {HTMLSelectElement} tableDropdown
 * @param {HTMLSelectElement[]} dropdowns
 */
async function loadColumnsOnTableChange(tableDropdown, dropdowns) {
    tableDropdown.addEventListener("change", async () => {
        // @ts-ignore
        const table = tableDropdown.value;
        await getAndloadColumns(table, dropdowns);
    });
}

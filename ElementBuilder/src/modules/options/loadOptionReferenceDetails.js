import {
    elementBuilderService,
    optionDetailService,
} from "../../services/index.js";
import {
    optionColumnDropdown,
    optionTableDropdown,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";

// @ts-ignore
$(variables.optionReferenceDetailsModal).on(
    "show.bs.modal",
    async function (e) {
        const { success, detail } = await optionDetailService.getOptionDetailBy(
            variables.elementId,
            variables.formId
        );

        const { tables } = await elementBuilderService.getTables();

        const { columns } = await elementBuilderService.getColumnsOf(
            success ? detail.tableName: tables[0]
        );

        optionTableDropdown.innerHTML = "";
        optionColumnDropdown.innerHTML = "";

        tables.forEach(
            /**
             *
             * @param {string} table
             */
            (table) => {
                optionTableDropdown.innerHTML += createOptions(table);
            }
        );

        columns.forEach(
            /**
             *
             * @param {string} column
             */
            (column) => {
                optionColumnDropdown.innerHTML += createOptions(column);
            }
        );
        // if (
        //     success &&
        //     detail.tableName.length > 0 &&
        //     detail.columnName.length > 0
        // ) {
        //     // @ts-ignore
        //     optionTableDropdown.value = detail.tableName;

        //     // @ts-ignore
        //     optionColumnDropdown.value = detail.columnName;
        // }

        if (success) {
        
            // @ts-ignore
            optionTableDropdown.value = detail.tableName;

            // @ts-ignore
            optionColumnDropdown.value = detail.columnName;
            
        }
    }
);

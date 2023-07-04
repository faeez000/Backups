import {
    autoSuggestionDetailService,
    elementBuilderService,
} from "../../services/index.js";
import {
    autoSuggestionColumnDropdown,
    autoSuggestionTableDropdown,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";

// @ts-ignore
$(variables.autoSuggestionModal).on("show.bs.modal", async function (e) {
    const { success, detail } =
        await autoSuggestionDetailService.getAutoSuggestionDetailBy(
            variables.elementId,
            variables.formId
        );
    const { tables } = await elementBuilderService.getTables();

    const { columns } = await elementBuilderService.getColumnsOf(
        success && detail.tableName.length > 0 ? detail.tableName : tables[0]
    );

    autoSuggestionTableDropdown.innerHTML = "";
    autoSuggestionColumnDropdown.innerHTML = "";

    tables.forEach(
        /**
         *
         * @param {string} table
         */
        (table) => {
            autoSuggestionTableDropdown.innerHTML += createOptions(table);
        }
    );

    columns.forEach(
        /**
         *
         * @param {string} column
         */
        (column) => {
            autoSuggestionColumnDropdown.innerHTML += createOptions(column);
        }
    );
    if (
        success &&
        detail.tableName.length > 0 &&
        detail.columnName.length > 0
    ) {
        // @ts-ignore
        autoSuggestionTableDropdown.value = detail.tableName;

        // @ts-ignore
        autoSuggestionColumnDropdown.value = detail.columnName;
    }
});

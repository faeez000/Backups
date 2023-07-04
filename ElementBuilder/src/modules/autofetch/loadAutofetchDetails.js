import PrimaryElementDetail from "../../domain/core/ValueObject/PrimaryElementDetail.js";
import {
    autofetchDetailService,
    elementBuilderService,
    elementService,
} from "../../services/index.js";
import {
    columnDropdown,
    primaryElementDropdown,
    tableDropdown,
    whereColumnDropdown,
} from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { createOptions } from "../shared/components/createOptions.js";

// @ts-ignore
$(variables.autofetchDetailModal).on("show.bs.modal", async function (e) {
    const { primaryElements } = await elementService.getPrimaryElementsBy(
        variables.formId
    );

    const { tables } = await elementBuilderService.getTables();

    const { success, detail } =
        await autofetchDetailService.getAutofetchDetailBy(variables.elementId);

    const { columns } = await elementBuilderService.getColumnsOf(
        success ? detail.tableName : tables[0]
    );

    primaryElementDropdown.innerHTML = "";
    tableDropdown.innerHTML = "";
    columnDropdown.innerHTML = "";
    whereColumnDropdown.innerHTML = "";

    tables.forEach(
        /**
         *
         * @param {string} table
         */
        (table) => {
            tableDropdown.innerHTML += createOptions(table);
        }
    );

    columns.forEach(
        /**
         *
         * @param {string} column
         */
        (column) => {
            columnDropdown.innerHTML += createOptions(column);
            whereColumnDropdown.innerHTML += createOptions(column);
        }
    );

    primaryElements.forEach(
        /**
         *
         * @param {PrimaryElementDetail} primaryElement
         */
        (primaryElement) => {
            primaryElementDropdown.innerHTML += createOptions(
                primaryElement.id,
                primaryElement.name
            );
        }
    );

    if (success) {


        // @ts-ignore
        tableDropdown.value = detail.tableName;

        // @ts-ignore
        columnDropdown.value = detail.columnName;

        // @ts-ignore
        whereColumnDropdown.value = detail.whereColumnName;

        // @ts-ignore
        primaryElementDropdown.value = detail.primaryElementId;
    }
});

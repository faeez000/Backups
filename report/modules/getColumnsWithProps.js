import ViewSubEntries from "../components/GridSubEntries/ViewSubEntries.jsx";
import SimpleChatModal from "../components/SimpleWithChat/SimpleChatModal.jsx";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton.jsx";
import { dateFilterParam } from "./dateFilterParam.js";

function getColumnsWithProps(columns, formType) {
    if (Array.isArray(columns)) {
        const createdColumns = createColumns(columns);
        if (formType === "Grid" || formType === "GridWithSection") {
            return [
                {
                    cellRenderer: function (params) {
                        return <ViewSubEntries params={params} />;
                    },
                },
                ...createdColumns,
            ];
        } else if (formType === "SimpleWithChat") {
            return [
                {
                    cellRenderer: function (params) {
                        return <SimpleChatModal params={params} />;
                        // return <ViewSubEntries params={params} />;
                    },
                },
                ...createdColumns,
            ];
        } else return createdColumns;
    }
}

function createColumns(columns) {
    const createdColumns = columns.map((item) => {
        if (item.type === "Date") {
            return {
                ...item,
                filter: "agDateColumnFilter",
                filterParams: dateFilterParam,
            };
        }
        if (item.field.toLowerCase() === "whatsapp number") {
            return {
                field: item.field,
                cellRenderer: WhatsAppButton,
            };
        }
        return item;
    });

    return createdColumns;
}

export { getColumnsWithProps };

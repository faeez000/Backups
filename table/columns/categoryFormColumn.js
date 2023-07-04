import { getColumnWithFilter } from "./modules/getColumnWithFilter";
import { getColumnWithActions } from "./modules/getColumnWithActions";
import { getColumnWithSearch } from "./modules/getColumnWithSearch";

export const getColumns = (handleDeleteItem) => {
    return [
        {
            ...getColumnWithSearch("Name", "name"),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            ...getColumnWithFilter("Category", "category", [
                { text: "simple", value: "simple" },
                { text: "grid", value: "grid" },
            ]),
        },
        {
            ...getColumnWithActions(handleDeleteItem),
        },
    ];
};

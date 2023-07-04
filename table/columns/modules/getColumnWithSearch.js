import FilterDropdownWithSearch from "../../components/search/FilterDropdownWithSearch";
import { SearchOutlined } from "@ant-design/icons";

export function getColumnWithSearch(columnTitle, columnDataIndex) {
    return {
        title: columnTitle,
        dataIndex: columnDataIndex,
        key: columnDataIndex,
        filterDropdown: FilterDropdownWithSearch,
        filterIcon: <SearchOutlined />,
        onFilter: (value, record) =>
            record[columnDataIndex].toLowerCase().includes(value.toLowerCase()),
    };
}

export function getColumnWithSort(columnTitle, columnDataIndex) {
  return {
    title: columnTitle,
    dataIndex: columnDataIndex,
    key: columnDataIndex,
    sorter: (a, b) => a.columnDataIndex.localeCompare(b.columnDataIndex),
    sortDirections: ["descend", "ascend"],
  };
}

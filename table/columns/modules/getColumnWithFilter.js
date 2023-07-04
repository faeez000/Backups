export function getColumnWithFilter(
  columnTitle,
  columnDataIndex,
  filterOptionsArray
) {
  return {
    title: columnTitle,
    dataIndex: columnDataIndex,
    key: columnDataIndex,
    filters: filterOptionsArray,
    onFilter: (value, record) => {
      return record[columnDataIndex].indexOf(value) === 0;
    },
  };
}

import { Table, Space, Popconfirm } from "antd";
import {
    GridTableDeleteIcon,
    GridTableEditIcon,
} from "../../../../../../../../shared/components/Icons";

const { Column } = Table;

export default function GridTable(props) {
    let columnsToRender = props.columnsForTable
        ? props.columnsForTable.map((columnKey) => {
              return (
                  <Column
                      title={columnKey}
                      dataIndex={columnKey}
                      key={columnKey}
                  />
              );
          })
        : [];

    function onConfirm(recordKey) {
        props.handleDeleteRow(recordKey);
    }

    return (
        <Table
            size="small"
            dataSource={props.dataForTable}
            pagination={false}
            rowKey={(record) => record.key}
            className="overflow-x-auto bg-white  min-h-[240px] border-x border-b "
            bordered
        >
            {columnsToRender}

            <Column
                title="Action"
                key="action"
                fixed="right"
                render={(recordObj, record) => (
                    <Space size="small">
                        <span
                            className="cursor-pointer text-blue-500"
                            onClick={() =>
                                props.handleEditRow(record.key, recordObj)
                            }
                        >
                            <GridTableEditIcon />
                        </span>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => onConfirm(record.key)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span className="cursor-pointer text-red-500">
                                <GridTableDeleteIcon />
                            </span>
                        </Popconfirm>
                    </Space>
                )}
            />
        </Table>
    );
}

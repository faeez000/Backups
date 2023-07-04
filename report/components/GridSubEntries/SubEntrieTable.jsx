import { Table } from "antd";
import { useEffect, useState } from "react";
import { formApiSerivce } from "../../services";

const { Column } = Table;

export default function SubEntrieTable(props) {
    const [state, setState] = useState({ loading: true, tableData: [] });

    useEffect(() => {
        async function getRecordAndSetTable() {
            const { success, record, message } =
                await formApiSerivce.getGridRecordsByFormIdRecordId(
                    props.formId,
                    props.recordId
                );
            if (success && record) {
                return setState({ tableData: record, loading: false });
            } else console.log(`something went wrong while table ${message}`);
            setState({ tableData: [], loading: false });
        }
        getRecordAndSetTable();
    }, [props.formId, props.recordId]);

    function getColumnsToRender() {
        if (state.tableData[0]) {
            return Object.keys(state.tableData[0]).map((item) => {
                return <Column title={item} dataIndex={item} key={item} />;
            });
        }
        return <h1>No Data</h1>;
    }

    return (
        <Table
            rowKey={(record) => Object.values(record).length * Math.random()}
            dataSource={state.tableData}
            pagination={false}
            className="overflow-x-auto max-h-[70vh] border-x border-b"
            bordered
            loading={state.loading}
        >
            {getColumnsToRender()}
        </Table>
    );
}

import { Popconfirm } from "antd";
import React from "react";
import { FilePdfOutlined } from "@ant-design/icons";
import { useAgGridContext } from "../../../../../context/AgGridContext";
import { reportButtonClassList } from "../../../utils/ButtonClassName";
import printDoc from "./Modules/printDoc";

const ExportToPdfButton = () => {
    const context = useAgGridContext();

    function setPDFRowsAndCallPrint(isSelectedRowsOnly) {
        let PDF_SELECTED_ROWS_ONLY = isSelectedRowsOnly;
        const printParams = {
            PDF_SELECTED_ROWS_ONLY,
        };
        printDoc(printParams, context.gridApi, context.columnApi);
    }

    function printAll() {
        setPDFRowsAndCallPrint(false);
    }

    function printSelected() {
        setPDFRowsAndCallPrint(true);
    }

    return (
        <Popconfirm
            title="Print Rows?"
            onConfirm={printAll}
            onCancel={printSelected}
            okText="All"
            cancelText="Selected"
        >
            <div className="flex item-center">
                <button type="submit" className={reportButtonClassList}>
                    <FilePdfOutlined style={{ fontSize: 18 }} />
                    <span className="self-center text-base whitespace-nowrap">
                        {" "}
                        Export to PDF
                    </span>
                </button>
            </div>
        </Popconfirm>
    );
};

export default ExportToPdfButton;

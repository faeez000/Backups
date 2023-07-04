import React, { useCallback } from "react";
import { ExportFileIcon } from "../../../../../../../shared/components/Icons";
import { FileExcelOutlined } from "@ant-design/icons";

import { useAgGridContext } from "../../../../../context/AgGridContext";
import { reportButtonClassList } from "../../../utils/ButtonClassName";

export default function ExportToCSVButton() {
    const context = useAgGridContext();

    const handleExportCsv = useCallback(() => {
        context.gridApi.exportDataAsCsv();
    }, [context]);

    return (
        <button className={reportButtonClassList} onClick={handleExportCsv}>
            <FileExcelOutlined style={{ fontSize: 18 }} />
            <span className="self-center text-base  whitespace-nowrap">
                {" "}
                Export to CSV
            </span>
        </button>
    );
}

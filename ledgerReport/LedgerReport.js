import React, {
    useMemo,
    useState,
    useRef,
    useEffect,
    useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Heading from "../ledgerBuilder/modules/ledgerEditor/components/Heading";
import { reportService } from "./services/index";
import ReportFilter from "./components/ReportFilter";
import ReportFilterModel from "./domain/ReportFilterModel";
import { BackButton } from "../../shared/components/Icons";
import "./style/printLedger.css";

const LedgerReport = () => {
    const gridRef = useRef();

    const { ledgerReportId } = useParams();

    const [reportName, setReportName] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [filterVaue, setFilterValue] = useState([]);
    const [reportFilterValue, setReportFilterValue] = useState();
    const [filterDetails, setFilterDetails] = useState({ isLoading: false });
    const [headerValue, SetHeaderValue] = useState([]);
    const [totalValue, setTotalValue] = useState([]);

    useEffect(async () => {
        const { success, reportname } = await reportService.getReportName(
            ledgerReportId
        );
        if (!success) {
            return;
        }
        setReportName(reportname[0]);

        const todayDate = new Date().toISOString().slice(0, 10);
        setFromDate(todayDate);
        setToDate(todayDate);
        const reportFilter = new ReportFilterModel(
            todayDate,
            todayDate,
            filterVaue
        );

        const { report } = await reportService.getReportData(
            ledgerReportId,
            reportFilter
        );
        if (!report) {
            return;
        }
        setReportData(report);
        setRowData(report.rows);

        const columnLocked = await report.columns.map((ele, index)=>{return {...ele, suppressMovable:true}})
        
        setColumnDefs(columnLocked);
        
        setTotalValue(report.TotalValue);
        const { filterDetail } = await reportService.getFilterDetails(
            ledgerReportId
        );

        if (!filterDetail) {
            return;
        }
        setFilterDetails(filterDetail, { isLoading: false });
        SetHeaderValue(filterDetail.HeaderValue);

    }, []);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            resizable: true,
            filter: true,
            editable: false,
        };
    }, []);

    const getRowStyle = useCallback((params) => {
        if (params.node.rowPinned) {
            return { fontWeight: "bold", boderTop: "2px solid black" };
        }
    }, []);

    const selectStartDate = (date) => {
        setFromDate(date);
    };
    const selectEndDate = (date) => {
        setToDate(date);
    };

    const submitFilter = async (first, second) => {
        if (filterDetails.FilterOption === "Single Value") {
            setFilterValue([first]);

            let firstFilter;
            {
                !first ? (firstFilter = []) : (firstFilter = [first]);
            }

            const reportFilter = new ReportFilterModel(
                fromDate,
                toDate,
                firstFilter
            );
            setReportFilterValue(reportFilter);
            const { report } = await reportService.getReportData(
                ledgerReportId,
                reportFilter
            );
            if (!report) {
                return;
            }

            localStorage.setItem("reportFilter", JSON.stringify(reportFilter));
            setReportData(report);
            setRowData(report.rows);
            setColumnDefs(report.columns);
            return;
        }

        setFilterValue([first, second]);
        const reportFilter = new ReportFilterModel(fromDate, toDate, [
            first,
            second,
        ]);
        const { report } = await reportService.getReportData(
            ledgerReportId,
            reportFilter
        );
        if (!report) {
            return;
        }
        localStorage.setItem("reportFilter", JSON.stringify(reportFilter));
        setReportData(report);
        setRowData(report.rows);
        setColumnDefs(report.columns);
    };

    return (
        <div className=" flex justify-center">
            {filterDetails.isLoading ? (
                <Spin tip="Loading..."></Spin>
            ) : (
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: "70vh",
                        width: "98%",
                        paddingLeft: "2rem",
                        paddingTop: "0",
                    }}
                >
                    <div className="flex items-center mb-2 justify-between">
                        <a href="/ledger-reports" className="flex items-center">
                            <BackButton />
                            <span className="text-xl pl-1 m-0">Back </span>
                        </a>
                        <Link to={`/ledger/${ledgerReportId}`} target="_blank">
                            Go to Ledger Builder
                        </Link>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <Heading reportData={reportName} />
                            <ReportFilter
                                headerValue={headerValue}
                                filterDetails={filterDetails}
                                startDate={selectStartDate}
                                endDate={selectEndDate}
                                submitFilterValue={submitFilter}
                            />
                        </div>
                        <Button>
                            <Link
                                to={`/preview-report-ledger/${ledgerReportId}`}
                            >
                                Preview
                            </Link>
                        </Button>
                    </div>
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        // paginationPageSize={11}
                        pagination={false}
                        rowData={rowData}
                        getRowStyle={getRowStyle}
                        rowSelection={"multiple"}
                        pinnedBottomRowData={reportData.TotalValue}
                        suppressRowClickSelection={true}
                        stopEditingWhenCellsLoseFocus={true}
                        suppressDragLeaveHidesColumns={true}
                    ></AgGridReact>
                </div>
            )}
        </div>
    );
};

export default LedgerReport;

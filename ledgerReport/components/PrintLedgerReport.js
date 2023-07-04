import React, { useState, useEffect } from "react";
import { Button, Table, Typography, Spin } from "antd";
import ReportFilterModel from "../domain/ReportFilterModel";
import { useParams } from "react-router";
import { reportService } from "../services/index";
import Heading from "../../ledgerBuilder/modules/ledgerEditor/components/Heading";
import PrintReportTopSection from "./PrintReportTopSection";
import CompanyDetails from "./CompanyDetails";
import { BackButton } from "../../../shared/components/Icons";
import "../style/printLedger.css";

function PrintLedgerReport() {
    const { Text } = Typography;
    const { ledgerReportId } = useParams();
    const [reportName, setReportName] = useState([]);
    const [printClick, setPrintClick] = useState(false);
    const [reportFilter, setReportFilter] = useState({});
    const [filterDetails, setFilterDetails] = useState({ isLoading: false });
    const [companyDetails, setCompanyDetails] = useState();
    const [rows, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [totalValue, setTotalValue] = useState([{}]);

    useEffect(async () => {
        const retriveFilter = localStorage.getItem("reportFilter");
        const parsefilter = JSON.parse(retriveFilter);

        const { success, reportname } = await reportService.getReportName(
            ledgerReportId
        );
        if (!success) {
            return;
        }
        setReportName(reportname[0]);

        if (parsefilter == null) {
            const todayDate = new Date().toISOString().slice(0, 10);
            const reportFilterModel = new ReportFilterModel(
                todayDate,
                todayDate
            );
            setReportFilter(reportFilterModel);
            const { report } = await reportService.getReportData(
                ledgerReportId,
                reportFilterModel
            );
            if (!report) {
                return;
            }
            setRowData(report.rows);
            setColumnDefs(report.columns);
            setTotalValue(report.TotalValue);

            const { company } = await reportService.getCompanyDetails();

            if (!company) {
                return;
            }
            setCompanyDetails(company[0]);

            const { filterDetail } = await reportService.getFilterDetails(
                ledgerReportId
            );
            if (!filterDetail) {
                return;
            }
            setFilterDetails(filterDetail, { isLoading: false });
            return;
        }
        setReportFilter(parsefilter);
        const reportFilterModel = new ReportFilterModel(
            parsefilter.FromDate,
            parsefilter.ToDate,
            parsefilter.FilterValue
        );
        const { report } = await reportService.getReportData(
            ledgerReportId,
            reportFilterModel
        );
        if (!report) {
            return;
        }
        setRowData(report.rows);
        setColumnDefs(report.columns);
        setTotalValue(report.TotalValue);

        const { company } = await reportService.getCompanyDetails();

        if (!company) {
            return;
        }
        setCompanyDetails(company[0]);

        const { filterDetail } = await reportService.getFilterDetails(
            ledgerReportId
        );
        if (!filterDetail) {
            return;
        }
        setFilterDetails(filterDetail, { isLoading: false });
    }, [ledgerReportId]);

    function prepColumns() {
        return columnDefs.map((column) => {
            return { title: column.field, dataIndex: column.field };
        });
    }

    const printPage = async () => {
        setPrintClick(!printClick);
        setTimeout(() => {
            window.print();
            setPrintClick(false);
        }, 1000);
    };

    return (
        <div className="">
            {filterDetails.isLoading ? (
                <div className="text-center p-5">
                    <Spin tip="Loading..."></Spin>
                </div>
            ) : (
                <div className="px-3 py-2">
                    <div className="flex justify-between">
                        <div
                            className="flex items-center mb-2"
                            style={{ display: printClick ? "none" : "" }}
                        >
                            <a
                                href={`/report-ledger/${ledgerReportId}`}
                                className="flex items-center"
                                onClick={() => localStorage.clear()}
                            >
                                <BackButton />
                                <span className="text-xl pl-1 m-0">Back</span>
                            </a>
                        </div>
                        <Button
                            className=" bg-blue-500  text-white "
                            style={{ display: printClick ? "none" : "block" }}
                            onClick={printPage}
                        >
                            Print
                        </Button>
                    </div>
                    {companyDetails ? (
                        <CompanyDetails companyDetails={companyDetails} />
                    ) : (
                        ""
                    )}

                    <div className="flex justify-between items-center ">
                        <div className="flex flex-col justify-center">
                            <label className=" p-0 text-xs text-gray-500"></label>
                            <Heading reportData={reportName} />
                        </div>
                    </div>

                    <PrintReportTopSection
                        filterDetails={filterDetails}
                        reportFilter={reportFilter}
                    />

                    <Table
                        columns={prepColumns()}
                        dataSource={rows}
                        size="small"
                        bordered
                        className="border-b border-black ledgerPrintableTable"
                        pagination={false}
                        summary={() => {
                            return (
                                <>
                                    {totalValue[0] ? (
                                        <Table.Summary.Row className="font-bold border-t border-black">
                                            {columnDefs.map((col, index) => {
                                                return (
                                                    <Table.Summary.Cell
                                                        key={index}
                                                        className="font-bold border-t border-black"
                                                    >
                                                        {
                                                            totalValue[0][
                                                                col.field
                                                            ]
                                                        }
                                                    </Table.Summary.Cell>
                                                );
                                            })}
                                        </Table.Summary.Row>
                                    ) : (
                                        <Table.Summary.Row className="font-bold border-t border-black">
                                            <Table.Summary.Cell className="font-bold border-t border-black">
                                                Total
                                            </Table.Summary.Cell>
                                            {columnDefs.map((col, index) => {
                                                return (
                                                    <Table.Summary.Cell
                                                        key={index}
                                                        className="font-bold border-t border-black"
                                                    ></Table.Summary.Cell>
                                                );
                                            })}
                                        </Table.Summary.Row>
                                    )}
                                </>
                            );
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default PrintLedgerReport;

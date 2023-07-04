import React from "react";
import ExportToPdfButton from "./components/ExportReport/ExportToPDF/ExportToPdfButton";
import AddButton from "./components/AddNew/AddButton";
import FilterButton from "./components/FilterReport/FilterButton";
import DeleteButton from "./components/DeleteRows/DeleteButton";
import EditButton from "./components/EditRow/EditButton";
import ExportToCSVButton from "./components/ExportReport/ExportToCSV/ExportToCSVButton";
import VisibleColumnsButton from "./components/VisibleColumns/VisibleColumnsButton";
import SearchInput from "./components/SearchInReport/SearchInput";
import TemlpateButton from "./components/TemplateReport/TemlpateButton";
import ClearFilterButton from "./components/FilterReport/ClearFilter/ClearFilterButton";
import { Dropdown, Menu } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { ExportFileIcon } from "../../../../shared/components/Icons";
import { reportButtonClassList } from "./utils/ButtonClassName";
import { Link } from "react-router-dom";
import SMSTemlpateButton from "./components/SMSTemlpateButton/SMSTemlpateButton";
import EmailTemlpateButton from "./components/EmailTemlpateButton/EmailTemlpateButton";
import CsvImport from "./components/CsvImport/CsvImport";

export default function ReportHeader(props) {
    const { columnDefs, setColumnDefs, setRowData, formName, formId } = props;

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <ExportToCSVButton />
            </Menu.Item>
            <Menu.Item key="2">
                <ExportToPdfButton />
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Link to={`/reports`}>
                <div className="inline-flex items-center pb-8 text-base text-gray-500 hover:text-blue-400">
                    <LeftCircleOutlined />
                    <span className="font-semibold ml-1 hover:to-blue-500">
                        Back
                    </span>
                </div>
            </Link>
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-semibold leading-tight text-3xl mt-0 mb-4">
                    {formName} Report
                </h1>
                <div className="flex items-center gap-3">
                    <SearchInput />
                    <CsvImport formId={formId} setRowData={setRowData} />
                    <AddButton />
                </div>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-4">
                    <EditButton />
                    <DeleteButton setRowData={setRowData} />
                    <Dropdown overlay={menu} placement="topLeft">
                        <button className={`${reportButtonClassList}`}>
                            <ExportFileIcon />
                            <span className="self-center text-base whitespace-nowrap">
                                Export
                            </span>
                        </button>
                    </Dropdown>
                    <TemlpateButton />
                    <SMSTemlpateButton />
                    <EmailTemlpateButton />
                </div>

                <div className="flex items-center gap-4">
                    <VisibleColumnsButton
                        columnDefs={columnDefs}
                        setColumnDefs={setColumnDefs}
                    />
                    <ClearFilterButton />
                    <FilterButton formId={formId} />
                </div>
            </div>
        </>
    );
}

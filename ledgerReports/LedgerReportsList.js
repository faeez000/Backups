import React, { useState, useEffect } from "react";
import { List, Tag, Input } from "antd";

import LedgerReportListComponent from "./components/LedgerReportListComponent";
import { FileSearchOutlined } from "@ant-design/icons";

import { reportService } from "./services/index";
import { BackButton } from "../../shared/components/Icons";

function LedgerReportsList() {
    const { Search } = Input;

    const [reportList, setReportList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(async () => {
        const { success, reports } = await reportService.getReportList();

        if (!success) {
            return;
        }
        setReportList(reports);
    }, []);

    const onSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredReports = () => {
        if (searchText === "") {
            return reportList;
        } else {
            return reportList.filter((el) =>
                el.Report_Name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
    };

    return (
        <div className="w-full lg:w-6/12 md:w-10/12  m-auto">
            <div className="flex items-center mb-4">
                <a href="/features" className="flex items-center">
                    <BackButton />
                    <span className="text-xl pl-1 m-0">Back </span>
                </a>
            </div>
            <div className="flex md:flex-row flex-col gap-2 justify-between mb-4">
                <div className="text-lg mr-5 font-semibold md:inline-flex gap-1 items-center flex-grow">
                    <FileSearchOutlined />
                    <span>Ledger Report</span>
                </div>
                <Search
                    placeholder="input search text"
                    onChange={onSearchInputChange}
                    style={{ width: 300 }}
                />
            </div>
            <List
                style={{ background: "#ffffff" }}
                size="large"
                header={<div className="font-semibold">Ledger Reports</div>}
                bordered
                dataSource={filteredReports()}
                renderItem={(item) => (
                    <LedgerReportListComponent reportList={item} />
                )}
            />
        </div>
    );
}

export default LedgerReportsList;

import { Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import { reportService } from "../../services";
import LedgerCardContainer from "./components/LedgerCardContainer";
import AddLedger from "./components/AddLedger";
import LedgerModel from "../../domain/LedgerModel";
import { userAPIService } from "../../../../shared/infra/service";

function Ledgers() {
    const [reportList, setReportList] = useState([]);
    const [inputText, setInputText] = useState("");

    useEffect(async () => {
        const account = await userAPIService.getMyAccount();

        if (!account.success) {
            window.location.href = "/404";
            return;
        }
        if (!account.account.isAdmin) {
            window.location.href = "/403";
            return;
        }

        const { success, reports } = await reportService.getReportList();
        if (!success) {
            return;
        }
        setReportList(reports);
    }, []);

    const deleteReport = async (reportId) => {
        const { success, messages } = await reportService.deleteReport(
            reportId
        );
        if (!success) {
            message.error(messages);
            return;
        }

        message.success(messages);
        const newReportList = reportList.filter((report) => {
            return report.Report_ID !== reportId;
        });
        setReportList(newReportList);
    };

    const addReport = async (report) => {
        if (!report) {
            message.error("Please Enter Correct Name");
            return;
        }

        const addReport = new LedgerModel(report);
        const { success, messages } = await reportService.save(addReport);
        const { reports } = await reportService.getReportList();
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        setReportList(reports);
    };

    const updateReport = async (id, reportName) => {
        if (!reportName) {
            message.error("Please insert Name");
            return;
        }

        const updateReportModel = new LedgerModel(reportName);
        const { success, messages } = await reportService.update(
            id,
            updateReportModel
        );
        const { reports } = await reportService.getReportList();
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        setReportList(reports);
    };

    const searchInput = (value) => {
        setInputText(value);
    };

    return (
        <div className="w-2/3 m-auto">
            <AddLedger addReport={addReport} searchReport={searchInput} />
            <LedgerCardContainer
                reportList={reportList}
                deleteReport={deleteReport}
                updateReport={updateReport}
                inputText={inputText}
            />
        </div>
    );
}

export default Ledgers;

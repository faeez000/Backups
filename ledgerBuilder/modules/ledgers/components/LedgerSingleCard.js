import { Button, message, Popconfirm, Input, Modal } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../../../../shared/components/Icons";

function LedgerSingleCard({ report, deleteReport, updateReport }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [reportName, setReportName] = useState();

    const confirm = (reportId) => {
        deleteReport(reportId);
    };

    const handleEditReport = (e) => {
        setReportName(e.target.value);
    };

    const handleOk = (id) => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);
        updateReport(id, reportName.trim());
        setReportName(reportName.trim());
        setIsModalVisible(false);
    };
    const showModal = () => {
        setReportName(report.Report_Name);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="bg-white max-w-md rounded-lg border p-4 shadow-xs hover:border-slate-300  flex justify-between items-center">
            <div className="cursor-pointer text-base font-medium overflow-hidden text-ellipsis">
                <Link to={`/ledger/${report.Report_ID}`}>
                    {report.Report_Name}
                </Link>
            </div>
            <div className="flex items-center justify-center">
                <Popconfirm
                    title="Are you sure to delete this Report?"
                    onConfirm={() => confirm(report.Report_ID)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button className="border-0 p-0 hover:text-red-600">
                        <DeleteIcon />
                    </Button>
                </Popconfirm>

                <Button className="border-0 p-0 " onClick={showModal}>
                    <EditIcon />
                </Button>

                <Modal
                    title="Edit Report"
                    visible={isModalVisible}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,

                        <Button
                            key="submit"
                            type="primary"
                            loading={confirmLoading}
                            onClick={() => handleOk(report.Report_ID)}
                        >
                            Update
                        </Button>,
                    ]}
                >
                    <div className="flex items-center justify-between pb-3">
                        <label className="pr-4">Ledger Name :</label>
                        <Input
                            value={reportName}
                            id={report.Report_ID}
                            onChange={handleEditReport}
                            className=" max-w-[22rem]"
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default LedgerSingleCard;

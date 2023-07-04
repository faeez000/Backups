import { Button, Divider, Input, Modal, message } from "antd";
import { BackButton } from "../../../../../shared/components/Icons";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

function AddLedger({ addReport, searchReport }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [report, setReport] = useState();

    const handleAddReport = (e) => {
        setReport(e.target.value);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        if (!report) {
            message.error("please enter name");
            return;
        }
        await addReport(report.trim());
        setReport(null);
        setIsModalVisible(false);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setReport(null);
    };
    const onSearch = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        searchReport(lowerCase);
    };
    return (
        <div className="">
            <div className="flex items-center ">
                <a href="/features" className="flex items-center">
                    <BackButton />
                    <span className="text-xl pl-1 m-0">Back </span>
                </a>
            </div>
            <div className="flex flex-wrap  justify-between items-center m-auto p-4  border-b-[1px] ">
                <div className=" text-3xl font-semibold mb-2">
                    Ledger Builder
                </div>
                <div className="flex justify-between items-center flex-wrap ">
                    <Input
                        placeholder="Input search text"
                        allowClear
                        style={{
                            width: 300,
                            marginRight: "1rem",
                        }}
                        onChange={onSearch}
                        prefix={<SearchOutlined />}
                    />

                    <Button className="" onClick={showModal}>
                        Add Ledger
                    </Button>
                </div>

                <Modal
                    title="Add Report"
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
                            onClick={handleOk}
                        >
                            Add Ledger
                        </Button>,
                    ]}
                >
                    <div className="flex items-center justify-between pb-3">
                        <label className="pr-4">Ledger Name :</label>
                        <Input
                            value={report}
                            onChange={handleAddReport}
                            className=" max-w-[22rem]"
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default AddLedger;

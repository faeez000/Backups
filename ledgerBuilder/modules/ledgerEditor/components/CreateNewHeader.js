import React, { useState } from "react";
import { Button, Modal, Input, Select, Checkbox } from "antd";
import { AddHeader } from "../../../../../shared/components/Icons";

function NewHeader(props) {
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [Header_Text, setName] = useState("");
    const [Header_Type, setDataType] = useState("Text");
    const [hasBottomTotal, setHasBottomTotal] = useState(false);

    const handleChangeInput = (e) => {
        setName(e.target.value);
    };

    const handleChangeSelect = (value) => {
        setHasBottomTotal(false);
        setDataType(value);
    };

    const handleChecked = (e) => {
        setHasBottomTotal(e.target.checked);
    };

    const handleOk = (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        props.addHeader({
            Header_Text,
            Header_Type,
            hasBottomTotal,
        });
        setName("");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setName("");
        setHasBottomTotal(false);
        setIsModalVisible(false);
    };

    return (
        <div className="flex justify-center items-center">
            <AddHeader />
            <Button
                onClick={showModal}
                className="pl-1 pr-5 text-base font-medium border-0"
            >
                Add Header
            </Button>
            <Modal
                title="New Header"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between items-center pb-3">
                    <label className="text-base font-medium">Name</label>
                    <Input
                        className=" max-w-[21rem]"
                        value={Header_Text}
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="flex justify-between items-center pb-4">
                    <label className="text-base font-medium">Data Type</label>
                    <Select
                        defaultValue={Header_Type}
                        style={{ width: "21rem" }}
                        onChange={handleChangeSelect}
                    >
                        <Option value="Text">Text</Option>
                        <Option value="Number">Number</Option>
                        <Option value="Date">Date</Option>
                        <Option value="Time">Time</Option>
                    </Select>
                </div>
                {Header_Type == "Number" ? (
                    <div className="flex items-center ">
                        <label className="text-base pr-3 font-medium">
                            Add Bottom Total
                        </label>
                        <Checkbox
                            className=" max-w-[21rem]"
                            checked={hasBottomTotal}
                            onChange={handleChecked}
                        ></Checkbox>
                    </div>
                ) : (
                    ""
                )}
            </Modal>
        </div>
    );
}

export default NewHeader;

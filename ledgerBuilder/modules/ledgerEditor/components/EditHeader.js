import React, { useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import { AddHeader } from "../../../../../shared/components/Icons";

function EditHeader({ editHeader, headers }) {
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleChangeInput = (e) => {
        editHeader(e.target.value);
        // setHeader(e.target.value);
    };

    const handleOk = (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        // setId(id + 1);

        // console.log("this.state", Header_Text);
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex justify-center items-center">
            <AddHeader />
            <Button
                onClick={showModal}
                className="pl-1 pr-5 text-base font-medium border-0"
            >
                Edit Header
            </Button>
            <Modal
                title="Edit Header"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="pb-3">
                    {/* <label className="text-base font-medium">Name</label> */}
                    {headers.map((header) => {
                        return (
                            <div className="flex">
                                <Input
                                    className="mb-2 mr-2"
                                    value={header.Header_Text}
                                    onChange={handleChangeInput}
                                />
                                <Button>Update</Button>
                            </div>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
}

export default EditHeader;

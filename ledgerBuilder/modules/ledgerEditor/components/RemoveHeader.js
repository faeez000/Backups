import React, { useState } from "react";
import { Button, Modal, Checkbox, Popconfirm } from "antd";
import { RemoveHeaderIcon } from "../../../../../shared/components/Icons";

function RemoveHeader(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [checked, setChecked] = useState([]);

    const handleCheck = (e) => {
        const checkedId = e.target.id;
        const checkedStat = e.target.checked;
        if (checkedStat) {
            if (!checked.includes(checkedId)) {
                checked.push(checkedId);
            }
        } else {
            const filtered = checked.filter((elem) => elem != checkedId);
            setChecked(filtered);
        }
    };

    const handleOk = (e) => {
        e.preventDefault(e);
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);
        const uncheCkedColumns = props.headers.filter((elem) => {
            return !checked.includes(elem.Header_ID);
        });
        props.removeHeader(uncheCkedColumns, checked);
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {props.headers.length >= 1 ? (
                <div className="flex justify-center items-center">
                    <RemoveHeaderIcon />
                    <Button
                        onClick={showModal}
                        className="pr-5 pl-1 text-base font-medium border-0"
                    >
                        Remove Header
                    </Button>
                    <Modal
                        title="Remove Header"
                        visible={isModalVisible}
                        confirmLoading={confirmLoading}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Popconfirm
                                // placement="rightTop"
                                title="Are you sure to delete this task?"
                                onConfirm={handleOk}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button>OK</Button>
                            </Popconfirm>,
                        ]}
                    >
                        <div className="flex flex-col pb-3">
                            {props.headers.map((header) => (
                                <Checkbox
                                    key={header.Header_ID}
                                    id={header.Header_ID}
                                    onChange={handleCheck}
                                    className="text-base font-medium"
                                >
                                    {header.Header_Text}
                                </Checkbox>
                            ))}
                        </div>
                    </Modal>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default RemoveHeader;

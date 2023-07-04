import React, { useState } from "react";
import { Button, Modal, Avatar, Card, Tooltip, Input } from "antd";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import "./CardPreview.css";

function CardPreviewModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { Meta } = Card;

    const { TextArea } = Input;
    return (
        <div>
            <div>
                <Tooltip placement="top" title="Preview">
                    <EyeOutlined
                        style={{ fontSize: "20px", color: "rgb(148 163 184)" }}
                        onClick={() => {
                            showModal();
                        }}
                    />
                </Tooltip>
            </div>
            <Modal
                title={
                    <p className="text-lg font-semibold text-violet-500">
                        Preview
                    </p>
                }
                style={{
                    top: 20,
                    height: "150px",
                }}
                className="Modal"
                visible={isModalVisible}
                // onOk={() => setModal1Open(false)}
                onCancel={() => setIsModalVisible(false)}
                footer={[]}
                // closable={false}
            >
                <p className="text-base font-semibold flex bg-violet-50 p-0.5">
                    Title :
                </p>
                <p className="text-base font-normal  border-2 border-neutral-100 p-2">
                    {props.cardDetails.cardTitle}
                </p>

                <p className="mt-2 text-base font-semibold bg-violet-50 p-0.5">
                    SubTitle :
                </p>
                <p className="text-base font-normal  border-2 border-neutral-100 p-2">
                    {props.cardDetails.cardSubtitle}
                </p>

                <p className="mt-2 text-base font-semibold bg-violet-50 p-0.5">
                    Description :
                </p>
                <TextArea
                    className="text-base font-normal text-violet-500 hover:cursor-default mt-1"
                    style={{ color: "black" }}
                    name="cardDescription"
                    value={props.cardDetails.cardDescription}
                    disabled
                />
                {/* <p className="text-base font-normal  border-2 border-neutral-100 p-2">
                    {props.cardDetails.cardDescription}
                </p> */}

                <p className="text-base font-semibold mt-2 bg-violet-50 p-0.5">
                    Assign By :
                </p>
                <p className="text-base font-normal  border-2 border-neutral-100 p-2">
                    {props.cardDetails.creatorName}
                </p>

                <p className="text-base font-semibold mt-2 bg-violet-50 p-0.5">
                    Assign To :
                </p>
                <div className="cardDiv mt-4">
                    {props.cardDetails.user.map((user) => {
                        return (
                            <Card
                                className="rounded-md bg-white border-2 border-neutral-300 mb-1 drop-shadow-md"
                                key={user.user_id}
                                style={{
                                    minWidth: 170,
                                    height: 65,
                                    marginLeft: "2%",
                                }}
                            >
                                <Meta
                                    avatar={<Avatar src={user.profilePic} />}
                                    title={user.username}
                                />
                            </Card>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
}

export default CardPreviewModal;

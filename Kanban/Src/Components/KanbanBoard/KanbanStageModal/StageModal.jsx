import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Dropdown } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import { kanbanBoardController } from "../../../Controller/index.js";

function StageModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [stageTitle, setStageTitle] = useState("");

    const showModal = () => {
        setIsModalVisible(true);
        setStageTitle();
    };

    const handleOk = async () => {
        if (props.action === "create") {
            const newStage = {
                stageTitle: stageTitle,
            };

            await kanbanBoardController.addKanbanStageWith(
                props.kanbanId,
                newStage
            );

            props.addStage();
        } else if (props.action === "update") {
            const UpdatedStage = {
                stageTitle: stageTitle,
            };

            await kanbanBoardController.updateKanbanStageDetailsBy(
                props.stageId,
                props.kanbanId,
                UpdatedStage
            );

            props.editStageDetails(props.stageId, UpdatedStage);
        }

        setIsModalVisible(false);
        setStageTitle();
    };

    const handleCancel = () => {
        setIsModalVisible(false);

        setStageTitle();
    };

    const handleChange = (e) => {
        const title = e.target.value;
        setStageTitle(title);
    };

    const onEditButtonClick = () => {
        setStageTitle(props.stageTitle);
    };

    return (
        <div>
            {props.action === "create" ? (
                <Button type="primary" onClick={showModal}>
                    Add Stage
                </Button>
            ) : (
                // <p className='font-semibold mb-2 cursor-pointer' onClick={()=>{showModal(); onEditButtonClick()}}>Edit Stage</p>
                <EditOutlined
                    className="mr-2"
                    style={{ fontSize: "16px", color: "rgb(148 163 184)" }}
                    onClick={() => {
                        showModal();
                        onEditButtonClick();
                    }}
                />
            )}

            <Modal
                className="z-[500]"
                title={
                    props.action === "create"
                        ? "Create New Stage"
                        : "Update Stage"
                }
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
            >
                <p className="font-semibold text-base mb-2">Stage Title</p>
                <Input
                    placeholder="Tag Name"
                    name="tagName"
                    value={stageTitle}
                    onChange={handleChange}
                />
            </Modal>
        </div>
    );
}

export default StageModal;

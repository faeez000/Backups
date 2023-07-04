import { Modal } from "antd";
import React, { useState } from "react";
import { ViewColumnsIcon } from "../../../../../../shared/components/Icons";
import { reportButtonClassList } from "../../utils/ButtonClassName";
import ViewColumns from "./ViewColumns";

export default function VisibleColumnsButton(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <button className={reportButtonClassList} onClick={showModal}>
                <ViewColumnsIcon className="h-5 w-6" />
                <span className="self-center text-base whitespace-nowrap">
                    Columns
                </span>
            </button>
            <Modal
                title="View Columns"
                width={400}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                bodyStyle={{ padding: 0 }}
            >
                <ViewColumns
                    columnDefs={props.columnDefs}
                    setColumnDefs={props.setColumnDefs}
                />
            </Modal>
        </>
    );
}

import SubEntrieTable from "./SubEntrieTable";
import { useParams } from "react-router";
import { Modal, Button } from "antd";
import { useState } from "react";

export default function ViewSubEntries(props) {
    const { formId } = useParams();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onClick = () => {
        showModal();
    };
    return (
        <>
            <button
                className="border-0 flex items-center pl-3"
                title="view sub-entries"
                onClick={onClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-news"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="rgb(139 92 246 /1)"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                    <line x1="8" y1="8" x2="12" y2="8" />
                    <line x1="8" y1="12" x2="12" y2="12" />
                    <line x1="8" y1="16" x2="12" y2="16" />
                </svg>
            </button>
            <Modal
                title="Sub-Entries Table"
                width={1000}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <SubEntrieTable
                    formId={formId}
                    recordId={props.params.data.id}
                />
            </Modal>
        </>
    );
}

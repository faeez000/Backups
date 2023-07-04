import React from "react";
import { Modal } from "antd";
import { useModal } from "../../hooks/useModal";
import AddNewVariableNameSetup from "../setup/AddNewVariableNameSetup";
import CloseBtn from "../CloseBtn";

export default function AddNewVariableNameConfig(props) {
    const { isVisible, hideModal, showModal } = useModal();

    return (
        <div>
            <button
                type="button"
                onClick={showModal}
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
                Add Variable
            </button>
            <Modal
                title={<div className="flex justify-between items-center">
                            <h1>Add Varriable</h1>
                            <CloseBtn onclickFunction={hideModal} />
                        </div>}
                visible={isVisible}
                footer={null}
                onCancel={hideModal}
                closable={false}
                width={450}
                bodyStyle={{ padding: "20px 20px 10px 20px" }}
            >
                <AddNewVariableNameSetup {...props} />
            </Modal>
        </div>
    );
}

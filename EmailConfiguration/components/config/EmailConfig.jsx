import { Modal } from "antd";
import React from "react";
import { useModal } from "../../hooks/useModal";
import CloseBtn from "../CloseBtn";

export default function EmailConfig() {
    let selectedForm = { form_name: "new form for email" };
    const { isVisible, hideModal, showModal, toggle } = useModal();

    const handleUpdateButton = () => {
        console.log("clicked handleUpdateButton");
    };

    return (
        <div>
            <button type="button" onClick={showModal}>
                {selectedForm ? (
                    <span className="border border-indigo-400 text-indigo-500 px-2 py-1 bg-indigo-50">
                        {selectedForm.form_name} &#x270E;
                    </span>
                ) : (
                    <span className="border border-red-400 text-red-500 px-2  py-1 bg-red-100">
                        Form Not Found &#x270E;
                    </span>
                )}
            </button>

            <Modal
                title={
                    <div className="flex justify-between items-center">
                        <h1>Edit Configure Variable</h1>
                        <button
                            onClick={handleUpdateButton}
                            type="button"
                            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            ADD
                        </button>
                    </div>
                }
                visible={isVisible}
                footer={[
                    <CloseBtn
                        onclickFunction={hideModal}
                        key={Math.random()}
                    />,
                ]}
                onCancel={hideModal}
                closable={false}
                width={450}
                bodyStyle={{
                    padding: "15px",
                    minHeight: "230px",
                }}
            >
                {/* <VariableConfigSetup
                    forms={forms}
                    smsTemplateId={smsTemplateId}
                    selectedForm={selectedForm}
                    templateConfigData={templateConfigData}
                    handleAddProperty={handleAddProperty}
                    handleEditProperty={handleEditProperty}
                    handleDeleteProperty={handleDeleteProperty}
                    handleFormChange={handleFormChange}
                /> */}
            </Modal>
        </div>
    );
}

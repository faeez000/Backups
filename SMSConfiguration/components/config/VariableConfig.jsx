import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "antd";
import { useModal } from "../../hooks/useModal";
import VariableConfigSetup from "../setup/VariableConfigSetup";

import { variableConfigController } from "../controllers";
import CloseBtn from "../CloseBtn";

export default function VariableConfig({ smsTemplateId, forms, setFormId }) {
    const { isVisible, hideModal, showModal, toggle } = useModal();

    const [templateConfigData, setTemplateConfigData] = useState([]);
    const [selectedForm, setSelectedForm] = useState({});

    const getAndSetTemplateVariables = useCallback(() => {
        (async function () {
            const variablesData =
                await variableConfigController.getTemplateVariables(
                    smsTemplateId
                );
            if (variablesData) {
                setTemplateConfigData(variablesData.variables);
                setSelectedForm(
                    forms.find((form) => form.formId === variablesData.formId)
                );
            }
        })();
    }, [forms, smsTemplateId]);

    useEffect(() => {
        getAndSetTemplateVariables();
    }, [getAndSetTemplateVariables]);

    function clearSelectedElements() {
        const tempConfigsWithClearElements = templateConfigData.map(
            (config) => {
                return { ...config, elementId: "" };
            }
        );
        setTemplateConfigData(tempConfigsWithClearElements);
    }

    const handleAddProperty = async () => {
        const variablesData =
            await variableConfigController.getTemplateVariables(smsTemplateId);
        if (variablesData) {
            setTemplateConfigData(variablesData.variables);
        }
    };

    const handleEditProperty = (variableName, updatedDetails) => {
        setTemplateConfigData(
            templateConfigData.map((config) => {
                return config.variableName === variableName
                    ? { ...config, ...updatedDetails }
                    : config;
            })
        );
    };

    const handleDeleteProperty = (variableName) => {
        setTemplateConfigData(
            templateConfigData.filter(
                (config) => config.variableName !== variableName
            )
        );
    };

    const handleUpdateButton = async () => {
        const templateDTO = {
            formId: selectedForm.formId,
            variables: templateConfigData,
        };
        await variableConfigController.updateVariables(
            smsTemplateId,
            templateDTO
        );
    };

    const handleFormChange = (formId) => {
        clearSelectedElements();
        setFormId(formId)
        setSelectedForm(forms.find((form) => form.formId === formId));
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
                        <CloseBtn onclickFunction={hideModal} />
                    </div>
                }
                visible={isVisible}
                footer={[
                    <button
                        key={Math.random()}
                        onClick={handleUpdateButton}
                        type="button"
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Update
                    </button>,
                ]}
                onCancel={hideModal}
                closable={false}
                width={450}
                bodyStyle={{
                    padding: "15px",
                    minHeight: "230px",
                }}
            >
                <VariableConfigSetup
                    forms={forms}
                    smsTemplateId={smsTemplateId}
                    selectedForm={selectedForm}
                    templateConfigData={templateConfigData}
                    handleAddProperty={handleAddProperty}
                    handleEditProperty={handleEditProperty}
                    handleDeleteProperty={handleDeleteProperty}
                    handleFormChange={handleFormChange}
                />
            </Modal>
        </div>
    );
}

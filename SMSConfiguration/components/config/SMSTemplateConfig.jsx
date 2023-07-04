import React from "react";
import { Modal } from "antd";
import { useModal } from "../../hooks/useModal";

import { SMSTemplateCardEditIcon } from "../../icons/icons";
import { useEffect } from "react";
import { useFormFields } from "../../hooks/useFormFields";
import { smsTemplateController } from "../controllers";
import SMSTemplateConfigSetup from "../setup/SMSTemplateConfigSetup";
import CloseBtn from "../CloseBtn";
import { isFieldsFilled } from "../../../../shared/modules/validations/isFieldFilled";
import { useCallback } from "react";

export default function SMSTemplateConfig({
    action,
    getAndSetTemplates,
    forms,
    smsTemplateId,
}) {
    const { isVisible, hideModal, showModal } = useModal();

    const [
        fields,
        setValues,
        handleFieldsChange,
        handelSelectField,
        clearFields,
    ] = useFormFields({
        templateName: "",
        authKey: "",
        flowId: "",
        formId: "",
    });

    const fetchAndSetSMSTemplate = useCallback(() => {
        return (async function () {
            const smsTemplate = await smsTemplateController.getSMSTemplate(
                smsTemplateId
            );

            if (smsTemplate) {
                setValues({
                    templateName: smsTemplate[0].templateName,
                    authKey: smsTemplate[0].authKey,
                    flowId: smsTemplate[0].flowId,
                    formId: smsTemplate[0].formId,
                });
            }
        })(); 
    },[smsTemplateId,setValues ])

    useEffect(() => {
            if (action === "edit" && smsTemplateId) {
                fetchAndSetSMSTemplate()
            }else {
                setValues({
                    templateName: "",
                    authKey: "",
                    flowId: "",
                    formId: ""
                });
            };
    }, [action, setValues, smsTemplateId, fetchAndSetSMSTemplate]);

    /**
     *
     * @param {object} fields
     */

    const handleSave = async () => {
        if (!isFieldsFilled(fields)) {
            return alert("fields not filled");
        }
        
        /**
         *@decrypted this validation to save marathi characters.
            if (!isValidName(fields["templateName"])) {
                return alert("Contains Special Characters.");
            } 
         */

        const addTemplateDTO = {};
        addTemplateDTO["authkey"] = fields["authKey"];
        addTemplateDTO["flowId"] = fields["flowId"];
        addTemplateDTO["templateName"] = fields["templateName"].trim();
        addTemplateDTO["formId"] = fields["formId"];

        if (action === "edit") {
            const isUpdated = await smsTemplateController.updateSMSTemplate(
                smsTemplateId,
                addTemplateDTO
            );
            if (isUpdated) {
                getAndSetTemplates();
                hideModal();
            }else  fetchAndSetSMSTemplate()
        } else {
            const isAdded = await smsTemplateController.addTemplate(
                addTemplateDTO
            );
            if (isAdded) {
                getAndSetTemplates();
                clearFields();
                hideModal();
            }
        }
    };

    const handleCloseButton = () => {
        if (action === "edit" && smsTemplateId) {
            fetchAndSetSMSTemplate()
        }
        hideModal()
    }

    return (
        <div>
            {action === "addNew" ? (
                <button
                    type="button"
                    onClick={showModal}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Add New
                </button>
            ) : (
                <span onClick={showModal}>
                    <SMSTemplateCardEditIcon />
                </span>
            )}

            <Modal
                title={
                    <div className="flex justify-between items-center">
                        <h1>SMS Template Configuration</h1>
                        <CloseBtn onclickFunction={handleCloseButton} />
                    </div>
                }
                visible={isVisible}
                footer={[
                    <button
                        key={Math.random()}
                        onClick={handleSave}
                        type="button"
                        className="mr-2 inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        save
                    </button>,
                ]}
                onCancel={hideModal}
                closable={false}
                width={400}
            >
                <SMSTemplateConfigSetup
                    forms={forms}
                    action={action}
                    smsTemplateId={smsTemplateId}
                    smsConfigDetails={fields}
                    handleFieldsChange={handleFieldsChange}
                    handelSelectField={handelSelectField}
                />
            </Modal>
        </div>
    );
}

import { Modal } from "antd";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { isFieldsFilled } from "../../../../shared/modules/validations/isFieldFilled";
import { SMSTemplateCardEditIcon } from "../../../SMSConfiguration/icons/icons";
import { emailTemplateConfigController } from "../../controllers";
import { useFormFields } from "../../hooks/useFormFields";
import { useModal } from "../../hooks/useModal";
import CloseBtn from "../CloseBtn";
import EmailTemplateConfigSetup from "../setup/EmailTemplateConfigSetup";

export default function EmailTemplateConfig({
    action,
    emailTemplateId,
    bodyTemplateList,
    getAndSetEmailTemplates,
}) {
    const { isVisible, hideModal, showModal, toggle } = useModal();

    const [
        fields,
        setFieldValues,
        handleFieldsChange,
        handelSelectField,
        clearFields,
    ] = useFormFields({
        templateName: "",
        subject: "",
        bodyTemplateId: "",
        formId: "",
        recipientColumnId: "",
    });

    const fetchAndSetEmailTemplate = useCallback(() => {
        return (async function () {
            const emailTemplate =
                await emailTemplateConfigController.getEmailTemplate(
                    emailTemplateId
                );
            if (emailTemplate) {
                setFieldValues({
                    templateName: emailTemplate[0].templatename,
                    subject: emailTemplate[0].subject,
                    bodyTemplateId: emailTemplate[0].bodytemplate,
                    formId: emailTemplate[0].formid,
                    recipientColumnId: emailTemplate[0].RecipientEmail,
                });
            }
        })();
    }, [emailTemplateId, setFieldValues]);

    useEffect(() => {
        if (action === "edit" && emailTemplateId) {
            fetchAndSetEmailTemplate();
        } else {
            setFieldValues({
                templateName: "",
                subject: "",
                bodyTemplateId: "",
                formId: "",
                recipientColumnId: "",
            });
        }
    }, [action, emailTemplateId, setFieldValues, fetchAndSetEmailTemplate]);

    const handleSaveButton = async () => {
        if (!isFieldsFilled(fields)) {
            if(action = "edit")fetchAndSetEmailTemplate();
            return alert("fields not filled");
        }
        
        /**
         *@decrypted this validation to save marathi characters.
            if (!isValidName(fields["templateName"])) {
                return alert("Contains Special Characters.");
            } 
         */

        const emailTemplateDTO = {};
        emailTemplateDTO["templateName"] = fields["templateName"].trim();
        emailTemplateDTO["Subject"] = fields["subject"];
        emailTemplateDTO["RecipientEmail"] = fields["recipientColumnId"];
        emailTemplateDTO["BodyTemplate"] = fields["bodyTemplateId"];
        emailTemplateDTO["formId"] = fields["formId"];

        if (action === "edit") {
            const isUpdated =
                await emailTemplateConfigController.updateEmailTemplate(
                    emailTemplateId,
                    emailTemplateDTO
                );
            if (isUpdated) {
                hideModal();
                getAndSetEmailTemplates();
            } else fetchAndSetEmailTemplate();
        } else {
            const isAdded =
                await emailTemplateConfigController.addEmailTemplate(
                    emailTemplateDTO
                );
            if (isAdded) {
                getAndSetEmailTemplates();
                clearFields();
                hideModal();
            }
        }
    };

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
                        <h1>Email Template Configuration</h1>
                        <CloseBtn onclickFunction={hideModal} />
                    </div>
                }
                visible={isVisible}
                footer={[
                    <button
                        key={Math.random()}
                        onClick={handleSaveButton}
                        type="button"
                        className="mr-2 inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        save
                    </button>,
                ]}
                onCancel={hideModal}
                closable={false}
                width={450}
                bodyStyle={{
                    minHeight: "230px",
                }}
            >
                <EmailTemplateConfigSetup
                    action={action}
                    emailTemplateConfig={fields}
                    bodyTemplateList={bodyTemplateList}
                    handleFieldsChange={handleFieldsChange}
                    handelSelectField={handelSelectField}
                    setFieldValues={setFieldValues}
                />
            </Modal>
        </div>
    );
}

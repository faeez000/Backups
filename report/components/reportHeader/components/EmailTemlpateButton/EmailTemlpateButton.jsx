import React, { useEffect, useState } from "react";
import { Select, Divider, Button, Space } from "antd";
import { useAgGridContext } from "../../../../context/AgGridContext";
import { showSuccessOrFailure } from "../../../../modules/showSuccessOrFailure";
import { emailTemplateApiService } from "../../../../services";
import { useParams } from "react-router";

const { Option } = Select;

export default function EmailTemlpateButton() {
    const context = useAgGridContext();

    const [items, setItems] = useState([]);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [selcetedTemplate, setSelectedTemplate] = useState(null);

    const { formId } = useParams();

    useEffect(() => {
        (async function () {
            const { success, emailTemplates } =
                await emailTemplateApiService.getEmailTemplatesByFormId(formId);
            if (!success)
                console.log(
                    "error :something went wrong while fetchig templates"
                );
            else {
                setItems(emailTemplates);
            }
        })();
    }, [formId]);

    const onSendClick = async () => {
        if (isNodesSelected && selcetedTemplate) {
            let selectedNodes = context.gridApi.getSelectedNodes();
            const selectedRecordsId = selectedNodes.map((node) => ({
                key: "id",
                value: node.data.id,
            }));
            const isSendSuccessfully = await sendEmailToSelectedRecord(
                selectedRecordsId
            );
            showSuccessOrFailure(isSendSuccessfully);
        }
        setIsOptionsOpen(false);
        console.log("Email sending operation completed");
    };

    const handleChange = (value) => {
        setIsOptionsOpen(true);
        if (!value) return setSelectedTemplate(null);
        setSelectedTemplate({ id: value });
    };

    async function sendEmailToSelectedRecord(selectedRecordsId) {
        const { success, message, data } =
            await emailTemplateApiService.sendEmail(
                selcetedTemplate.id,
                selectedRecordsId
            );
        if (success && data.isSend) {
            return { success, message };
        }
        return { success: false, message: "Email Sending failed" };
    }

    function isNodesSelected() {
        return context.gridApi?.getSelectedNodes()?.length > 0;
    }

    const selectOptions = items.map((item) => (
        <Option key={item.name} value={item.id}>
            {item.name}
        </Option>
    ));

    return (
        <Select
            style={{ width: 150 }}
            onClick={() => setIsOptionsOpen(true)}
            onBlur={() => setIsOptionsOpen(false)}
            onMouseDown={(e) => e.preventDefault()}
            onChange={handleChange}
            open={isOptionsOpen}
            defaultValue={false}
            showSearch={true}
            filterOption={(input, option) =>(option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
            dropdownRender={(menu) => (
                <>
                    <div onClick={(e) => e.stopPropagation()}>
                        {menu}
                        <Divider style={{ margin: "8px 0" }} />
                        <Space align="center" style={{ padding: "0 8px 4px" }}>
                            <Button
                                type="primary"
                                onClick={onSendClick}
                                style={{ whiteSpace: "nowrap" }}
                                disabled={
                                    !isNodesSelected() || !selcetedTemplate
                                        ? true
                                        : false
                                }
                            >
                                SEND
                            </Button>
                        </Space>
                    </div>
                </>
            )}
        >
            {[
                <Option key={Math.random()} value={false} selected>
                    - Email Template -
                </Option>,
                ...selectOptions,
            ]}
        </Select>
    );
}

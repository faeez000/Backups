import React, { Component } from "react";
import { SMSConfigDeleteCardIcon } from "../icons/icons";
import { smsTemplateAPIService } from "../services";
import { Popconfirm } from "antd";
import { showSuccessOrFailureMessage } from "../helpers/showSuccessOrFailureMessage";
import SMSTemplateConfig from "./config/SMSTemplateConfig";

export default class SMSTemplateCard extends Component {
    handleOnDeleteClick = (templateId) => {
        this.deleteSMS(templateId);
    };

    async deleteSMS(templateId) {
        try {
            const { success, message } =
                await smsTemplateAPIService.deleteSMSTemlpate(templateId);
            if (success) {
                this.props.deleteTemplate(templateId);
                return showSuccessOrFailureMessage({ success, message });
            }
            showSuccessOrFailureMessage({ success, message });
        } catch (error) {
            console.log("delete template failed", error);
        }
    }

    render() {
        return (
            <div className=" w-[300px] bg-white h-[80px] rounded-lg p-2 drop-shadow-md border">
                <div className="border-l-4 border-[#a395e0] rounded-sm h-full flex justify-between">
                    <div className="flex flex-col gap-2 ml-3">
                        <h4 className="text-[#6c57c6] font-semibold text-sm overflow-hidden text-ellipsis w-[205px]">
                            {this.props.smsTemplate.templateName}
                        </h4>
                        <p className="text-[#87898a]">some descrpition...</p>
                    </div>
                    <div className="cursor-pointer flex gap-1">
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() =>
                                this.handleOnDeleteClick(
                                    this.props.smsTemplate.templateId
                                )
                            }
                            okText="Yes"
                            cancelText="No"
                        >
                            <span>
                                <SMSConfigDeleteCardIcon />
                            </span>
                        </Popconfirm>
                        <SMSTemplateConfig
                            getAndSetTemplates={this.props.getAndSetTemplates}
                            forms={this.props.forms}
                            action={"edit"}
                            smsTemplateId={this.props.smsTemplate.templateId}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

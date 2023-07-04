import { Popconfirm } from "antd";
import React from "react";
import { SMSConfigDeleteCardIcon } from "../../SMSConfiguration/icons/icons";
import { emailTemplateConfigController } from "../controllers";
import EmailTemplateConfig from "./config/EmailTemplateConfig";

export default class EmailConfigCard extends React.Component {
    async handleOnDeleteClick(emailTemplateId) {
        const isDeleted =
            await emailTemplateConfigController.deleteEmailTemlpate(
                emailTemplateId
            );
        if (isDeleted) {
            this.props.deleteEmailTemplate(emailTemplateId);
        }
    }
    render() {
        return (
            <div className=" w-[300px] bg-white h-[80px] rounded-lg p-2 drop-shadow-md border">
                <div className="border-l-4 border-[#425cddc9] rounded-sm h-full flex justify-between">
                    <div className="flex flex-col gap-2 ml-3">
                        <h4 className="text-[#1d39c4] font-semibold text-sm overflow-hidden text-ellipsis w-[205px]">
                            {this.props.emailTemplate.templateName}
                        </h4>
                        <p className="text-[#87898a]">some descrpition...</p>
                    </div>
                    <div className="cursor-pointer flex gap-1">
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() =>
                                this.handleOnDeleteClick(
                                    this.props.emailTemplate.templateId
                                )
                            }
                            okText="Yes"
                            cancelText="No"
                        >
                            <span>
                                <SMSConfigDeleteCardIcon />
                            </span>
                        </Popconfirm>
                        <EmailTemplateConfig
                            action={"edit"}
                            emailTemplateId={
                                this.props.emailTemplate.templateId
                            }
                            bodyTemplateList={this.props.bodyTemplateList}
                            getAndSetEmailTemplates={
                                this.props.getAndSetEmailTemplates
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

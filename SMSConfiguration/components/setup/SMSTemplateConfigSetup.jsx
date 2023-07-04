import React, { Component } from "react";
import { Input, Select } from "antd";
import VariableConfig from "../config/VariableConfig";
const { Option } = Select;

export default class SMSTemplateConfigSetup extends Component {
    render() {
        const { templateName, authKey, flowId, formId } =
            this.props.smsConfigDetails;
        const isNewForm = this.props.action === "addNew";

        const formsOptionComponents = this.props.forms?.map((form, index) => (
            <Option value={form.formId} key={index}>
                {form.form_name}
            </Option>
        ));

        const setFormId = (formId) =>{
            this.props.handelSelectField(
                formId,
                "formId"
            )
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <td className="p-3">Template Name:</td>
                        <td className="w-full">
                            <Input
                                placeholder="Template Name"
                                name="templateName"
                                value={templateName}
                                onChange={this.props.handleFieldsChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3">AuthKey:</td>
                        <td>
                            <Input
                                placeholder="AuthKey"
                                name="authKey"
                                value={authKey}
                                onChange={this.props.handleFieldsChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="p-3">FlowId:</td>
                        <td>
                            <Input
                                placeholder="FlowId"
                                name="flowId"
                                value={flowId}
                                onChange={this.props.handleFieldsChange}
                            />
                        </td>
                    </tr>
                    {isNewForm ? (
                        <tr>
                            <td className="p-3">Form:</td>
                            <td>
                                <Select
                                    value={formId || "--Select Form--"}
                                    className="w-full"
                                    onChange={(value) =>
                                        setFormId(value)
                                    }
                                    allowClear
                                >
                                    {formsOptionComponents}
                                </Select>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td className="p-3">Form:</td>
                            <td>
                                <VariableConfig
                                    forms={this.props.forms}
                                    smsTemplateId={this.props.smsTemplateId}
                                    setFormId={setFormId}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

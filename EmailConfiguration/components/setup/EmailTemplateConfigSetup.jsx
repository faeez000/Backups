import React from "react";
import { Input, Select, Tag, Spin } from "antd";
import { emailTemplateConfigController } from "../../controllers";
const { Option } = Select;

export default class EmailTemplateConfigSetup extends React.Component {
    constructor(props) {
        super();
        this.state = {
            recipientColumns: [],
            formId: "",
            form: {},
            isLoading: this.isEditForm(props.action),
            isColomnsLoading: false,
        };
    }

    async componentDidMount() {
        if (this.isEditForm(this.props.action)) {
            const form = await this.getFormIdByTemplateId(
                this.props.emailTemplateConfig.bodyTemplateId
            );
            const columnList = await this.getColumnsByFormId(form.form_id);
            this.setState({
                form: form,
                recipientColumns: columnList,
                isLoading: false,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.emailTemplateConfig.formId !==
                this.props.emailTemplateConfig.formId &&
            !this.props.emailTemplateConfig.formId
        ) {
            this.setState({ form: {} });
        }
    }

    async getFormIdByTemplateId(templateId) {
        const form =
            await emailTemplateConfigController.getEmailFormListForEmailType(
                templateId
            );
        return form ? form : {};
    }

    async getColumnsByFormId(formId) {
        const columnList =
            await emailTemplateConfigController.getColumnListForEmailTemplate(
                formId
            );
        return columnList ? columnList : [];
    }

    isEditForm(propsAction) {
        return propsAction === "edit";
    }

    handleBodyTemplateChange = async (templateId) => {
        this.setState({
            isColomnsLoading: true,
        });
        const form = await this.getFormIdByTemplateId(templateId);
        const columnList = await this.getColumnsByFormId(form.form_id);
        this.setState({
            form: form,
            recipientColumns: columnList,
            isColomnsLoading: false,
        });
        this.props.setFieldValues((prevState) => {
            return {
                ...prevState,
                formId: form.form_id,
                bodyTemplateId: templateId,
                recipientColumnId: "",
            };
        });
    };

    render() {
        const bodyTemplateOptions = this.props.bodyTemplateList.map(
            (bodyTemplate, index) => {
                return (
                    <Option key={index} value={bodyTemplate.template_id}>
                        {bodyTemplate.template_name}
                    </Option>
                );
            }
        );

        const recipientColumnOption = this.state.recipientColumns.map(
            (recipientColumn, index) => {
                return (
                    <Option key={index} value={recipientColumn.fieldId}>
                        {recipientColumn.fieldname}
                    </Option>
                );
            }
        );

        const selectedFormComponent = () => {
            if (this.state.form.form_id) {
                return (
                    <Tag color="geekblue" className="w-full p-1">
                        {this.state.form.form_name}
                    </Tag>
                );
            } else if (formId) {
                return (
                    <Tag color="geekblue" className="w-full p-1">
                        {formId}
                    </Tag>
                );
            } else {
                return <Tag className="w-full p-1">Template Not Selected</Tag>;
            }
        };

        const {
            templateName,
            subject,
            formId,
            bodyTemplateId,
            recipientColumnId,
        } = this.props.emailTemplateConfig;

        return this.state.isLoading ? (
            <div className="flex h-[200px] justify-center items-center">
                <Spin />
            </div>
        ) : (
            <Spin tip="Loading..." spinning={this.state.isColomnsLoading}>
                <table>
                    <tbody>
                        <tr>
                            <td className="p-3 whitespace-nowrap ">
                                Template Name:
                            </td>
                            <td className="w-full max-w-[280px]">
                                <Input
                                    placeholder="Template Name"
                                    name="templateName"
                                    value={templateName}
                                    onChange={this.props.handleFieldsChange}
                                />
                            </td>
                        </tr>
                        <tr className="">
                            <td className="p-3 max-w-[280px]">Subject:</td>
                            <td>
                                <Input
                                    placeholder="Subject"
                                    name="subject"
                                    value={subject}
                                    onChange={this.props.handleFieldsChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="p-3">Body Template:</td>
                            <td>
                                <Select
                                    value={bodyTemplateId}
                                    className="w-full max-w-[280px]"
                                    onChange={(value) =>
                                        this.handleBodyTemplateChange(value)
                                    }
                                    allowClear
                                >
                                    {bodyTemplateOptions}
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3">Form:</td>
                            <td>{selectedFormComponent()}</td>
                        </tr>

                        <tr>
                            <td className="p-3">
                                Recipient Email
                                <br />
                                <span className="whitespace-nowrap">
                                    Address Column:
                                </span>
                            </td>
                            <td>
                                <Select
                                    value={
                                        recipientColumnId ||
                                        "-- Select Column --"
                                    }
                                    className="w-full max-w-[280px]"
                                    onChange={(value) =>
                                        this.props.handelSelectField(
                                            value,
                                            "recipientColumnId"
                                        )
                                    }
                                    allowClear
                                >
                                    {recipientColumnOption}
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Spin>
        );
    }
}

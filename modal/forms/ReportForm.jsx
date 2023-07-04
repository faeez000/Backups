import React, { Component } from "react";
import addFormWithModal from "../hoc/addFormWithModal";
import { Form, Input, Select } from "antd";

class ReportForm extends Component {
    render() {
        return (
            <Form
                form={this.props.form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: "public",
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of collection!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="simple">simple</Select.Option>
                        <Select.Option value="grid">grid</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}

const AddReportForm = addFormWithModal(ReportForm);
export default AddReportForm;

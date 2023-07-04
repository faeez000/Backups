import React, { Component } from "react";
import addFormWithModal from "../hoc/addFormWithModal";
import { Form, Input, Select } from "antd";

class TemplateForm extends Component {
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
                    name="Name"
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
                <Form.Item label="Layout" name="layout">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="game">game</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Form" name="form">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}
const AddTemplateForm = addFormWithModal(TemplateForm);

export default AddTemplateForm;

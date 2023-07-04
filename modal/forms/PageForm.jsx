import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import addFormWithModal from "../hoc/addFormWithModal";

class PageForm extends Component {
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
                <Form.Item label="Type" name="type">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="game">game</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}

const AddPageForm = addFormWithModal(PageForm);

export default AddPageForm;

import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import addFormWithModal from "../hoc/addFormWithModal";

class UserForm extends Component {
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
                    name="user_name"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the title of collection!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Select Role" name="select_role">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="game">game</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Select Profile" name="select_profile">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="game">game</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}

const AddUserForm = addFormWithModal(UserForm);

export default AddUserForm;

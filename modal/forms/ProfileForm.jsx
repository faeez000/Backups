import React, { Component } from "react";
import addFormWithModal from "../hoc/addFormWithModal";
import { Form, Input, Select } from "antd";

class ProfileForm extends Component {
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
                    name="profile_name"
                    label="Profile Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of collection!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Select Right" name="select_right">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="game">game</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        );
    }
}

const AddProfileForm = addFormWithModal(ProfileForm);

export default AddProfileForm;

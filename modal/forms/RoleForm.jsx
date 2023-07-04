import React, { Component } from "react";
import { Form, Input, Select, Upload, Button, Checkbox } from "antd";
import addFormWithModal from "../hoc/addFormWithModal";

class RoleForm extends Component {
    render() {
        const normFile = (e) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
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
                    name="role_name"
                    label="Role Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of collection!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Reports To" name="report_to">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="game">game</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Accessible to same Level"
                    name="accessible_to_same_level"
                >
                    <Checkbox onChange={() => console.log("checked")}>
                        Yes
                    </Checkbox>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item
                    name="role_image"
                    label="Role Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="upload png file here"
                >
                    <Upload
                        className="add_modal_uploader"
                        name="logo"
                        action="/upload.do"
                        listType="picture"
                    >
                        <Button
                            className="flex w-full"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>
                            }
                        >
                            Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        );
    }
}
const AddRoleForm = addFormWithModal(RoleForm);
export default AddRoleForm;

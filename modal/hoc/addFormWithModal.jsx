import { Form, Modal } from "antd";
import React, { Component } from "react";

function addFormWithModal(FormComponent) {
    return function (props) {
        const { visible, onCreate, onCancel } = props;
        const [form] = Form.useForm();
        return (
            <>
                <div onClick={(e) => e.stopPropagation()}>
                    <Modal
                        visible={!!visible}
                        title="Create a new collection"
                        okText="Create"
                        cancelText="Cancel"
                        onCancel={onCancel}
                        onOk={() => {
                            form.validateFields()
                                .then((values) => {
                                    form.resetFields();
                                    onCreate(values);
                                })
                                .catch((info) => {
                                    console.log("Validate Failed:", info);
                                });
                        }}
                    >
                        <FormComponent form={form} {...props} />
                    </Modal>
                </div>
            </>
        );
    };
}

export default addFormWithModal;

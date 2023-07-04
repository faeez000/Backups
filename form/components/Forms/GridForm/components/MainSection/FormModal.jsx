import React, { Component } from "react";
import { Modal, Button } from "antd";

export default class FormModal extends Component {
    setModalVisibility(value) {
        this.props.handleModalVisibility(value);
    }

    showModal = () => {
        this.setModalVisibility(true);
    };

    handleOk = () => {
        this.props.handleSumbitButton();
    };

    handleCancel = () => {
        this.props.resetField();
        this.setModalVisibility(false);
    };

    render() {
        return (
            <>
                <Button type="primary" className="" onClick={this.showModal}>
                    Add Entry
                </Button>
                <Modal
                    title="Entry Form"
                    visible={this.props.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText={"Close"}
                    okText={"Save"}
                    cancelButtonProps={{
                        className: "hover:bg-red-600 hover:text-white",
                    }}
                >
                    {this.props.mainFields}
                </Modal>
            </>
        );
    }
}

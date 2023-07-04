import React, { Component } from "react";
import MasterForm from "./MasterForm";
import { Button, Modal } from "antd";
import FormNavigation from "./components/FormNavigation";
import { OpenMasterModalIcon } from "../../../../../shared/components/Icons";

export default class MasterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };
        this.removeFormNameFromLocalStorage =
            this.removeFormNameFromLocalStorage.bind(this);
    }

    /**
     *
     * @param {boolean} visibility
     */
    setIsModalVisible(visibility) {
        this.setState({ isModalVisible: visibility });
    }

    showModal = () => {
        this.setIsModalVisible(true);
    };

    handleCancel = () => {
        this.setIsModalVisible(false);
    };

    removeFormNameFromLocalStorage() {
        if (localStorage.getItem("formNavigationArray")) {
            const formNavigationArray = JSON.parse(
                localStorage.getItem("formNavigationArray")
            );
            formNavigationArray.pop();
            localStorage.setItem(
                "formNavigationArray",
                JSON.stringify(formNavigationArray)
            );
        }
        this.props.fetchOptionsAndSetState();
    }
    render() {
        return (
            <>
                <Button
                    type="primary"
                    className="border-l-0 border-[#d9d9d9]"
                    onClick={this.showModal}
                    icon={<OpenMasterModalIcon />}
                />
                <Modal
                    title="Master Form"
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                    afterClose={this.removeFormNameFromLocalStorage}
                    footer={false}
                    width={1000}
                    bodyStyle={{
                        minHeight: "300px",
                        display: "flex",
                    }}
                >
                    <MasterForm formId={this.props.formId} />
                </Modal>
            </>
        );
    }
}

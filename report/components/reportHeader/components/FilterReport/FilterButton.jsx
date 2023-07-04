import React, { Component } from "react";
import { Modal } from "antd";
import FiltersComponent from "./FiltersComponent";
import { FiltersIcon } from "../../../../../../shared/components/Icons";
import { reportButtonClassList } from "../../utils/ButtonClassName";

export default class FilterButton extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
        };
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    closeModal = () => {
        this.setState({ isModalVisible: false });
    };

    handleOk = () => {
        this.setState({ isModalVisible: false });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };
    render() {
        return (
            <>
                <button
                    onClick={this.showModal}
                    className={`${reportButtonClassList}`}
                >
                    <FiltersIcon className="h-5 w-5" />
                    <span className="self-center text-base whitespace-nowrap">
                        Filters
                    </span>
                </button>

                <Modal
                    className="md:top-20 md:left-1/3 top-1/4 right-2/2"
                    width={280}
                    title=""
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    bodyStyle={{ padding: 0, minHeight: 300 }}
                >
                    <FiltersComponent
                        {...this.props}
                        closeModal={this.closeModal}
                    />
                </Modal>
            </>
        );
    }
}

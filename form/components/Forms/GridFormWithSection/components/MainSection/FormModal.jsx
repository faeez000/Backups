import React, { Component } from "react";
import {  Button } from "antd";

export default class FormModal extends Component {
    handleOk = () => {
        this.props.handleSumbitButton();
    };

    handleCancel = () => {
        this.props.resetField();    
    };

    render() {
        return (
            <div>
                {/* <Button type="primary" className="" onClick={this.setModalVisibility(true)}>
                    Add Entry
                </Button> */}
                <div className=" grid grid-cols-6 gap-x-4 gap-y-0">
                    {this.props.mainFields}
                </div>
                
                <div className="flex items-center justify-end">
                    <Button
                        onClick={this.handleOk}
                        style={{ marginRight: "5px" }}
                    >
                        Add Entry
                    </Button>

                    <Button
                        className="cursor-pointer"
                        onClick={this.handleCancel}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        );
    }
}

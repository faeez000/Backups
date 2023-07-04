import React, { Component } from "react";
import { Spin } from "antd";

export default class FormLoadingSpinner extends Component {
    render() {
        return (
            <div className="w-full flex justify-center h-[50vh] items-center">
                <Spin tip="Loading..." size="large"></Spin>;
            </div>
        );
    }
}

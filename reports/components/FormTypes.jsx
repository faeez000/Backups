import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

export default class FormTypes extends Component {
    getOptions() {
        const options = this.props.formTypes.map((formType, index) => (
            <Option value={formType} key={index}>
                {formType}
            </Option>
        ));
        return [
            <Option value="all" key="all">
                All
            </Option>,
            ...options,
        ];
    }

    render() {
        return (
            <Select
                className="reports-selector"
                defaultValue="Type"
                style={{ width: 200 }}
                onChange={this.props.filterByFormType}
            >
                {this.getOptions()}
            </Select>
        );
    }
}

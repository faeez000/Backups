import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

export default class FormsCategory extends Component {
    getOptions() {
        const options = this.props.categories.map((category) => (
            <Option value={category.category_id} key={category.category_id}>
                {category.category_name}
            </Option>
        ));

        const optionAll = (
            <Option value={"all"} key={"all_categories"}>
                All
            </Option>
        );
        return [optionAll, ...options];
    }

    render() {
        return (
            <Select
                className="reports-selector"
                defaultValue="Categories"
                style={{ width: "200px" }}
                onChange={this.props.filterByCategories}
            >
                {this.getOptions()}
            </Select>
        );
    }
}

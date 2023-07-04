import React, { Component } from "react";
import { List, Input, Spin } from "antd";
import ListItemComponent from "./ListItemComponent";
import { FileSearchOutlined, LoadingOutlined } from "@ant-design/icons";
import "../styles/reports.css";
import FormTypes from "./FormTypes";
import FormsCategory from "./FormsCategory";
const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default class ReportsList extends Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
        };
    }
    onSearchInputChange = (event) => {
        this.setState({ searchText: event.target.value });
    };

    render() {
        const filteredReports = () => {
            if (this.state.searchText === "") {
                return this.props.forms;
            } else {
                return this.props.forms.filter((el) =>
                    el.form_name
                        .toLowerCase()
                        .includes(this.state.searchText.toLowerCase())
                );
            }
        };

        return (
            <div className="w-full lg:w-6/12 md:w-10/12 reportsList m-auto">
                <div className="flex md:flex-row flex-col gap-2 justify-between mb-4">
                    <div className="text-lg mr-5 font-semibold md:inline-flex gap-1 items-center flex-grow">
                        <FileSearchOutlined />
                        <span>Form Report</span>
                    </div>
                    <FormTypes
                        formTypes={this.props.formTypes}
                        filterByFormType={this.props.filterByFormType}
                    />
                    <FormsCategory
                        categories={this.props.categories}
                        filterByCategories={this.props.filterByCategories}
                    />
                    <Search
                        placeholder="input search text"
                        onChange={this.onSearchInputChange}
                        style={{ width: 300 }}
                    />
                </div>
                <List
                    style={{ background: "#ffffff" }}
                    size="large"
                    loading={{
                        indicator: <Spin indicator={antIcon} />,
                        spinning: this.props.loading,
                    }}
                    header={<div className="font-semibold">Reports</div>}
                    bordered
                    dataSource={filteredReports()}
                    renderItem={(item) => (
                        <ListItemComponent
                            form={item}
                            formName={item.form_name}
                            formId={item.form_id}
                            formType={item.form_type}
                        />
                    )}
                />
            </div>
        );
    }
}

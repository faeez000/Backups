import React, { Component } from "react";
import { Table } from "antd";

export default function WithTable(TableHeaderComponent, data, getColumns) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                dataSource: data || null,
                selectedRowKeys: [] || null,
            };
        }

        onRowSelectChange = (selectedRowKeys) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    selectedRowKeys: selectedRowKeys,
                };
            });
        };

        handleDeleteItem = (id) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    dataSource: prevState.dataSource.filter(
                        (item) => item.id !== id
                    ),
                };
            });
        };

        handleDeleteMultipleItems = () => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    dataSource: prevState.dataSource.filter(
                        (item) => !prevState.selectedRowKeys.includes(item.id)
                    ),
                };
            });
        };

        handleAddItem = (item) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    dataSource: [...prevState.dataSource, item],
                };
            });
        };

        render() {
            const isRowSelected = this.state.selectedRowKeys.length > 0;

            const rowSelection = {
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: this.onRowSelectChange,
            };
            return (
                <>
                    <div className="table-App p-2">
                        <span className="hover:text-teal-800">
                            &larr; <span className="font-bold">Back</span>
                        </span>
                        <TableHeaderComponent
                            handleAddItem={this.handleAddItem}
                            handleDeleteMultipleItems={
                                this.handleDeleteMultipleItems
                            }
                            {...this.props}
                        />

                        <span>
                            {isRowSelected
                                ? `Selected ${this.state.selectedRowKeys.length} items`
                                : ""}
                        </span>
                        <header className="App-header">
                            <Table
                                size={"middle"}
                                bordered={true}
                                columns={getColumns(this.handleDeleteItem)}
                                dataSource={this.state.dataSource}
                                rowSelection={rowSelection}
                                rowKey="id"
                            ></Table>
                        </header>
                    </div>
                </>
            );
        }
    };
}

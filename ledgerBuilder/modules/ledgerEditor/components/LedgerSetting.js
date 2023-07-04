import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { Button, message, Modal, Select } from "antd";

import React, { useState } from "react";
import FilterModel from "../../../domain/FilterModel";

function LedgerSetting({
    headerList,
    filterSetting,
    reportId,
    filter,
    getFilterFunction,
}) {
    const { Option } = Select;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [filterBy, setFilterBy] = useState();
    const [filterOption, setFilterOption] = useState();
    const [sortBy, setSortBy] = useState();
    const [sortType, setSortType] = useState();
    const [dataType, setDataType] = useState();

    const handleFilterByChange = (value, e) => {
        setFilterBy(value);
        setDataType(e.datatype);
    };
    const handleFilterOptionChange = (value) => {
        setFilterOption(value);
    };
    const handleSortByChange = (value) => {
        setSortBy(value);
    };
    const handleSortTypeChange = (value) => {
        setSortType(value);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        // if (!filterBy || !filterOption || !sortBy || !sortType) {
        //     message.error("Please select Value");
        //     return;
        // }

        const filterModel = new FilterModel(
            reportId,
            filterBy,
            filterOption,
            sortBy,
            sortType
        );
        filterSetting(filterModel);
        setIsModalVisible(false);
    };

    const showModal = async () => {
        setFilterBy(filter.FilterByHeaderId);
        setFilterOption(filter.FilterOption);
        setSortBy(filter.SortBy_HeaderId);
        setSortType(filter.SortType);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="py-4">
            <Button onClick={showModal}>Ledger Setting</Button>
            <Modal
                title="Ledger Setting"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,

                    <Button
                        key="submit"
                        type="primary"
                        loading={confirmLoading}
                        onClick={handleOk}
                    >
                        Update
                    </Button>,
                ]}
            >
                <div className="pb-3">
                    <div className="flex justify-between mb-5">
                        <div className="flex flex-col">
                            <label className="pb-1">Filter By :</label>
                            <Select
                                style={{ width: "13rem" }}
                                value={filterBy}
                                onChange={handleFilterByChange}
                            >
                                {headerList.map((header) => {
                                    return (
                                        <Option
                                            key={header.Header_ID}
                                            value={header.Header_ID}
                                            datatype={header.Header_Type}
                                        >
                                            {header.Header_Text}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="flex flex-col">
                            <label className="pb-1">Filter Option:</label>
                            <Select
                                style={{ width: "14rem" }}
                                value={filterOption}
                                onChange={handleFilterOptionChange}
                            >
                                {dataType === "Text" ? (
                                    <Option value="Single Value">
                                        Single Value
                                    </Option>
                                ) : (
                                    <>
                                        <Option value="Single Value">
                                            Single Value
                                        </Option>
                                        <Option value="Range Value">
                                            Range Value
                                        </Option>
                                    </>
                                )}
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <label className="pb-1">Sort By :</label>
                            <Select
                                style={{ width: "13rem" }}
                                value={sortBy}
                                onChange={handleSortByChange}
                            >
                                {headerList.map((header) => {
                                    return (
                                        <Option
                                            key={header.Header_ID}
                                            value={header.Header_ID}
                                        >
                                            {header.Header_Text}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                        <div className="flex flex-col">
                            <label className="pb-1">Sort Type :</label>
                            <Select
                                style={{ width: "14rem" }}
                                value={sortType}
                                onChange={handleSortTypeChange}
                            >
                                <Option value="Ascending">Ascending </Option>
                                <Option value="Descending">Descending</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default LedgerSetting;

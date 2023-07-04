import React, { useState } from "react";
import { Button, Modal, Input, message, Select } from "antd";
import { CreatRow } from "../../../../../shared/components/Icons";

function NewRow(props) {
    const [index_No, setIndex_No] = useState(0);
    const [FieldId, setFieldId] = useState([]);
    const [resetColumnValue, setResetColumnValue] = useState({});
    const [defaultValue, setDefaultValue] = useState("");
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [resetTable, SetResetTable] = useState({ Form: "--Select Form--" });
    let row = new Map();

    const handleTableChange = (value, e) => {
        props.selectTable(value);
        SetResetTable({ ...resetTable, Form: value });
        resetValue();
    };

    const resetValue = () => {
        let a = { ...resetColumnValue };
        Object.keys(a).forEach((item) => (a[item] = ""));
        setResetColumnValue(a);
    };
    const resetTableValue = () => {
        let a = { ...resetTable };
        Object.keys(a).forEach((item) => (a[item] = "--Select Form--"));
        SetResetTable(a);
    };

    const prepareRow = () => {
        row = new Map();
        for (let header of props.headers) {
            const cell = createCell(
                index_No,
                header.Header_ID,
                header.Header_Text,
                props.selectedColValue[header.Header_Text]
            );

            row.set(header.Header_Text, cell);
        }
        row = row;
    };

    const createCell = (index_No, Header_ID, Header_Text, FieldId) => {
        return {
            index_No,
            Header_ID,
            Header_Text,
            FieldId,
        };
    };

    const handleChange = async (value, e) => {
        const key = e.name;
        const idd = e.id;
        setDefaultValue({ ...defaultValue, [key]: value });

        setFieldId([...FieldId, { key, idd }]);
        await props.selectColValue(key, idd);
        updateCell(key, idd);
        setResetColumnValue({ ...resetColumnValue, [key]: value });
    };
    const updateCell = (key, value) => {
        row.get(key).value = value;
    };

    const handleOk = (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        // if (!defaultValue) {
        //     message.error("Please Select Value");
        //     return;
        // }
        resetValue();
        resetTableValue();
        props.refreshColumnValues();

        const rowArray = Array.from(row.values());
        props.addRow(rowArray);
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        resetValue();
        resetTableValue();
        props.refreshColumnValues();
        setIsModalVisible(false);
    };

    prepareRow();
    return (
        <div className="flex justify-center items-center">
            <CreatRow />
            <Button
                onClick={showModal}
                className="pl-1 pr-5 text-base font-medium border-0"
            >
                Create Row
            </Button>
            <Modal
                title="New Row"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between items-center pb-3">
                    <label className="text-base font-medium">Form</label>
                    <Select
                        showSearch
                        value={resetTable["Form"]}
                        style={{ width: "21rem" }}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        onChange={handleTableChange}
                    >
                        {props.tables.map((table, index) => {
                            return (
                                <Option key={index} value={table.formId}>
                                    {table.form_name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
                <div className="mt-4">
                    <h5
                        style={{ color: "#646464" }}
                        className="text-lg font-bold"
                    >
                        Headers
                    </h5>
                </div>

                {props.headers.map((header, index) => (
                    <div
                        key={header.Header_Text}
                        className="flex justify-between items-center pb-3"
                    >
                        <label className="text-base font-medium">
                            {header.Header_Text}
                        </label>

                        <Select
                            style={{ width: "21rem" }}
                            onChange={handleChange}
                            value={resetColumnValue[header.Header_Text]}
                        >
                            <Option
                                name={header.Header_Text}
                                id="null"
                                value="null"
                            >
                                None
                            </Option>
                            {props.colValues[header.Header_Type].map(
                                (colValue, index) => (
                                    <Option
                                        key={index}
                                        value={colValue.ColumnName}
                                        id={colValue.ColumnId}
                                        name={header.Header_Text}
                                    >
                                        {colValue.ColumnName}
                                    </Option>
                                )
                            )}
                        </Select>
                    </div>
                ))}
            </Modal>
        </div>
    );
}

export default NewRow;

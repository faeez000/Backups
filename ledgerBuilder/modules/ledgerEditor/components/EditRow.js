import React, { useState } from "react";
import { Button, Modal, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { EditIcon } from "../../../../../shared/components/Icons";

function EditRow(props) {
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [resetColumnValue, setResetColumnValue] = useState({});
    const [showSelectedRowInModal, setShowSelectedRowInModal] = useState([]);
    const [selectedColumnId, setSelectedColumnId] = useState([]);
    const [selectedTableId, setSelectedTableId] = useState("");
    const [loading, setLoading] = useState(true);

    const showSelectedRow = async () => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        const rows = props.rows;
        const selRows = props.selectedRow;
        const selectedId = props.selectedId;
        const selectedFilteredRow = rows.filter((nested) => {
            return nested.find((elem) => {
                return selectedId == elem.Row_ID;
            });
        });
        setShowSelectedRowInModal(selectedFilteredRow);
        selectedFilteredRow.forEach((nested) => {
            nested.forEach((value) => {
                props.selectTable(value.FormId);
                setSelectedTableId(value.FormId);
            });
        });

        props.selectedEditRow.RowsList.forEach((nested) => {
            let obj = {};
            nested.forEach((value) => {
                obj[value.Header_Text] = value.FieldId;
            });
            setResetColumnValue({
                ...resetColumnValue,
                ...obj,
            });
        });
    };

    const handleTableChange = (value) => {
        props.selectTable(value);
        let a = { ...resetColumnValue };
        Object.keys(a).forEach((item) => (a[item] = ""));
        setResetColumnValue(a);
    };

    const handleChange = (value, e) => {
        setSelectedColumnId({ ...selectedColumnId, [e.id]: e.id });
        const key = e.name;
        props.selectColValue(key, value);

        setResetColumnValue({ ...resetColumnValue, [key]: value });
    };

    const handleOk = (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        const updateSelectedRow = showSelectedRowInModal.filter((nested) => {
            return nested.filter((elem) => {
                if (selectedColumnId[elem.Header_ID]) {
                    elem.FieldId = props.selectedColValue[elem.Header_Text];
                }
            });
        });

        props.editRow(updateSelectedRow);
        setIsModalVisible(false);
    };

    const showModal = () => {
        showSelectedRow();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
                width: "21rem",
            }}
            spin
        />
    );

    return (
        <div className="flex justify-center items-center">
            <EditIcon />
            <Button
                onClick={showModal}
                className="pl-1 text-base font-medium border-0"
            >
                Edit Row
            </Button>
            <Modal
                title="Edit Row"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between items-center pb-3">
                    <label className="text-base font-medium">Form</label>
                    <Select
                        defaultValue={props.selectedEditRow.form_name}
                        style={{ width: "21rem" }}
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
                <div>
                    {props.headers.map((header, index) => (
                        <div
                            key={header.Header_Text}
                            className="flex justify-between items-center pb-3"
                        >
                            <label className=" font-medium text-base">
                                {header.Header_Text}
                            </label>

                            {loading ? (
                                <Spin indicator={antIcon}></Spin>
                            ) : (
                                <Select
                                    style={{ width: "21rem" }}
                                    onChange={handleChange}
                                    value={resetColumnValue[header.Header_Text]}
                                >
                                    <Option
                                        name={header.Header_Text}
                                        id={header.Header_ID}
                                        value="null"
                                    >
                                        None
                                    </Option>

                                    {props.colValues[header.Header_Type].map(
                                        (colValue, index) => (
                                            <Option
                                                key={index}
                                                fieldid={colValue.ColumnName}
                                                value={colValue.ColumnId}
                                                id={header.Header_ID}
                                                name={header.Header_Text}
                                            >
                                                {colValue.ColumnName}
                                            </Option>
                                        )
                                    )}
                                </Select>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
}

export default EditRow;

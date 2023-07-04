import React, { useState } from "react";
import { Button, DatePicker, Select, Space } from "antd";

function ReportFilter({
    filterDetails,
    startDate,
    endDate,
    headerValue,
    submitFilterValue,
}) {
    const { Option } = Select;

    const [filterFirst, setFilterFirst] = useState("");
    const [filterSecond, setFilterSecond] = useState("");
    const [emptyValue, setEmptyValue] = useState([]);
    const onStartDate = (date, dateString) => {
        startDate(dateString);
    };
    const onEndDate = (date, dateString) => {
        endDate(dateString);
    };
    const handleFirstFilterValueChange = (value) => {
        setFilterFirst(value);
    };
    const handleSecondFilterValueChange = (value) => {
        setFilterSecond(value);
    };
    const search = () => {
        submitFilterValue(filterFirst, filterSecond);
    };

    return (
        <div className="flex flex-col my-4">
            <div className="flex mb-4 text-gray-500 font-medium">
                <div className="pr-3">
                    <label className="pr-2">Entry From :</label>
                    <DatePicker onChange={onStartDate} />
                </div>
                <div className="pr-3">
                    <label className="pr-2">To :</label>
                    <DatePicker onChange={onEndDate} />
                </div>
            </div>
            <div className="flex items-center">
                <div className="pr-3 flex items-center">
                    <label className="text-gray-500 font-medium">
                        {filterDetails.Header_Text}
                    </label>
                </div>
                {filterDetails.Header_Text ? (
                    <>
                        {filterDetails.FilterOption === "Single Value" ? (
                            <div className="pr-2">
                                <Select
                                    style={{
                                        width: 150,
                                    }}
                                    onChange={handleFirstFilterValueChange}
                                >
                                    <Option value={emptyValue}>Null</Option>
                                    {headerValue.map((value, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={
                                                    value[
                                                        `${filterDetails.Header_Text}`
                                                    ]
                                                }
                                            >
                                                {
                                                    value[
                                                        `${filterDetails.Header_Text}`
                                                    ]
                                                }
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        ) : (
                            <>
                                <div className="pr-2">
                                    <Select
                                        style={{
                                            width: 150,
                                        }}
                                        onChange={handleFirstFilterValueChange}
                                    >
                                        {headerValue.map((value, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={
                                                        value[
                                                            `${filterDetails.Header_Text}`
                                                        ]
                                                    }
                                                >
                                                    {
                                                        value[
                                                            `${filterDetails.Header_Text}`
                                                        ]
                                                    }
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </div>

                                <div className="pr-4">
                                    <Select
                                        style={{
                                            width: 150,
                                        }}
                                        onChange={handleSecondFilterValueChange}
                                    >
                                        {headerValue.map((value, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={
                                                        value[
                                                            `${filterDetails.Header_Text}`
                                                        ]
                                                    }
                                                >
                                                    {
                                                        value[
                                                            `${filterDetails.Header_Text}`
                                                        ]
                                                    }
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    ""
                )}

                <Button onClick={search}>Search</Button>
            </div>
        </div>
    );
}

export default ReportFilter;

import { Input, Button, Checkbox, Table, Tag, Space } from "antd";

import React from "react";

function RightForm() {
    const columns = [
        {
            title: "Form Name",
            dataIndex: "formname",
            key: "formname",
        },
        {
            title: "View",
            dataIndex: "view",
            key: "view",
        },
        {
            title: "Create",
            dataIndex: "create",
            key: "create",
        },
        {
            title: "Edit",
            key: "edit",
            dataIndex: "edit",
        },
        {
            title: "Delete",
            key: "Delete",
            dataIndex: "Delete",
        },
    ];

    const data = [
        {
            key: "1",
            formname: "Employee Details",
            view: <Checkbox />,
            create: <Checkbox />,
            edit: <Checkbox />,
            Delete: <Checkbox />,
        },
        {
            key: "2",
            formname: "Agreement",
            view: <Checkbox />,
            create: <Checkbox />,
            edit: <Checkbox />,
            Delete: <Checkbox />,
        },
        {
            key: "3",
            formname: "Financial",
            view: <Checkbox />,
            create: <Checkbox />,
            edit: <Checkbox />,
            Delete: <Checkbox />,
        },
    ];

    return (
        <div className="flex justify-center h-screen items-center bg-slate-100">
            <div className="w-[37rem]  max-w-full p-10 bg-slate-50 h-[80%] border-[1px] rounded-lg overflow-auto ">
                <div className="text-center p-1  rounded-md mb-8">
                    <h1 className="text-2xl font-bold mb-2  border-[1px] p-2 ">
                        Add New Right
                    </h1>
                </div>

                <div>
                    <form>
                        <div className="mb-5">
                            <label className="font-bold text-sm ">Name</label>
                            <Input style={{ marginTop: "3px" }} />
                        </div>

                        <div className="mb-5">
                            <Table columns={columns} dataSource={data} />
                        </div>

                        <Button
                            style={{
                                backgroundColor: "#7E56DA",
                                color: "#fafafa",
                                borderRadius: "5px",
                                width: "6rem",
                                fontWeight: "bold",
                            }}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RightForm;

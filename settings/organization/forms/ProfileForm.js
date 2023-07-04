import { Input, Button, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

function ProfileForm() {
    const { Option } = Select;
    const { TextArea } = Input;
    return (
        <div className="flex justify-center h-screen items-center bg-slate-100">
            <div className="w-[37rem]  max-w-full p-10 bg-slate-50 h-[80%] border-[1px] rounded-lg overflow-auto ">
                <div className="text-center p-1  rounded-md mb-8">
                    <h1 className="text-2xl font-bold mb-2  border-[1px] p-2 ">
                        Add New Profile
                    </h1>
                </div>

                <div>
                    <form>
                        <div className="mb-5">
                            <label className="font-bold text-sm ">
                                Profile Name
                            </label>
                            <Input style={{ marginTop: "3px" }} />
                        </div>

                        <div className="mb-5">
                            <label className="font-bold text-sm">
                                Select Right
                            </label>
                            <br />
                            <Select
                                defaultValue="lucy"
                                style={{ width: "100%", marginTop: "3px" }}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled"></Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </div>

                        <div className="mb-5">
                            <label className="font-bold text-sm ">
                                Description
                            </label>
                            <TextArea />
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

export default ProfileForm;

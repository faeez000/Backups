import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { userService } from "../services/index";

import ProfilePhoto from "./ProfilePhoto";

import { Delete } from "../../../shared/components/Icons";

function AddUserModal({ userList, user, showSelectedUserList }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputText, setInputText] = useState("");

    const showAddUserModal = () => {
        setIsModalVisible(true);
    };
    const handleAddUserCancel = () => {
        setIsModalVisible(false);
    };
    const selectUser = async (e) => {
        showSelectedUserList(e.target.id);
        setInputText("");
        setIsModalVisible(false);
        // setSelectedUsers(e.target.value);
    };
    const onSearch = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    return (
        <div>
            <Button
                className="border-0   text-blue-600 pt-2"
                onClick={showAddUserModal}
            >
                + Add User
            </Button>

            <Modal
                title="Add User"
                footer={null}
                visible={isModalVisible}
                height={800}
                className="p-0 overflow-auto"
                onCancel={handleAddUserCancel}
            >
                <Input
                    placeholder="input with clear icon"
                    allowClear
                    value={inputText}
                    onChange={onSearch}
                    prefix={<SearchOutlined />}
                />
                <h2 className="font-semibold flex justify-center items-center p-3 border-b-[1px] text-center">
                    Company Users
                </h2>
                <ul className="p-3   overflow-auto">
                    {userList
                        .filter((user) =>
                            user.username.toLowerCase().includes(inputText)
                        )
                        .map((value) => {
                            return (
                                <li
                                    className="flex items-center p-3  border-b-[1px] hover:bg-slate-100"
                                    key={value.user_id}
                                >
                                    <div className="w-7 h-7  cursor-pointer">
                                        <ProfilePhoto user={value} />
                                    </div>
                                    <input
                                        className="cursor-pointer hover:text-blue-400 bg-transparent outline-none px-2 border-0"
                                        onClick={selectUser}
                                        value={value.username}
                                        id={value.user_id}
                                        readOnly
                                    />
                                </li>
                            );
                        })}
                </ul>
            </Modal>
        </div>
    );
}

export default AddUserModal;

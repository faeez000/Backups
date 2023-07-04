import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Input, message, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Delete } from "../../../shared/components/Icons";
import AddUserModal from "./AddUserModal";
import ManageAccessModal from "./ManageAccessModal";
import { userService } from "../services/index";
import UserModel from "../domain/UserModel";
import ProfilePhoto from "./ProfilePhoto";
import { relativeTimeRounding } from "moment";

function UserCard({ user, userList }) {
    const { Option } = Select;
    const [visible, setVisible] = useState(false);

    const [showAddUserList, setShowAddUserList] = useState([]);
    const [showChildUserList, setShowChildUserList] = useState([]);
    const [showParentUserList, setShowParentUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const showModal = async () => {
        setVisible(true);
        const { success, users } = await userService.getSelectedUsers(
            user.user_id
        );

        if (!success) {
            return;
        }
        setShowChildUserList(users.childList);
        setShowParentUserList(users.parentList);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    useEffect(async () => {
        const { success, usersList } = await userService.getFilteredUser(
            user.user_id
        );

        if (!success) {
            return;
        }
        setShowAddUserList(usersList);
    }, []);

    const addChildUserList = async (selectedId) => {
        const addUser = new UserModel(user.user_id, selectedId);
        const { success, messages } = await userService.addUser(addUser);

        if (!success) {
            message.error(messages);
            return;
        }
        const { users } = await userService.getSelectedUsers(user.user_id);
        console.log(users);

        if (!success) {
            return;
        }
        message.success(messages);
        setShowChildUserList(users.childList);

        const { usersList } = await userService.getFilteredUser(user.user_id);

        if (!success) {
            return;
        }
        setShowAddUserList(usersList);
    };

    const addPrentUserList = async (selectedId) => {
        const addUser = new UserModel(selectedId, user.user_id);
        const { success, messages } = await userService.addUser(addUser);

        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        const { users } = await userService.getSelectedUsers(user.user_id);

        setShowParentUserList(users.parentList);

        const { usersList } = await userService.getFilteredUser(user.user_id);

        setShowAddUserList(usersList);
    };

    const removeChild = async (userId, childId) => {
        const { success, messages } = await userService.deleteBy(
            userId,
            childId
        );

        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);

        const { users } = await userService.getSelectedUsers(user.user_id);

        setShowChildUserList(users.childList);

        const { usersList } = await userService.getFilteredUser(user.user_id);

        setShowAddUserList(usersList);
    };

    const removeParent = async (parentId, userId) => {
        const { success, messages } = await userService.deleteBy(
            parentId,
            userId
        );

        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);

        const { users } = await userService.getSelectedUsers(user.user_id);

        if (!success) {
            message.error(messages);
            return;
        }
        setShowParentUserList(users.parentList);

        const { usersList } = await userService.getFilteredUser(user.user_id);

        setShowAddUserList(usersList);
    };

    const cancel = (e) => {
        message.error("Not Deleted");
    };

    return (
        <div className="w-24 flex flex-col items-center">
            <div
                className="w-24 h-24 text-5xl cursor-pointer"
                onClick={showModal}
            >
                <ProfilePhoto user={user} />
            </div>
            <h2 className="text-center pt-3">{user.username}</h2>
            <Modal
                title={user.username}
                visible={visible}
                footer={null}
                onCancel={handleCancel}
                width={800}
                height={800}
                className="p-0 overflow-auto"
            >
                <div>
                    <h2 className="text-lg font-bold ">Manage Access</h2>
                    <p className="p-2 pt-6">
                        Manager Access allows the user’s manager to access their
                        My Work section (View For), schedule their work, manage
                        personal events, and modify time reports.
                    </p>
                    <div className="px-2">
                        <div>
                            <p className="text-base font-bold pt-4">
                                {user.username} has Manager Access to :
                            </p>
                        </div>
                        <ul className="px-4">
                            {showChildUserList.map((child) => {
                                return (
                                    <li
                                        className="p-2  flex items-center justify-between font-medium border-b-[1px]"
                                        key={child.userid}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-7 h-7">
                                                <ProfilePhoto user={child} />
                                            </div>
                                            <span className="pl-2">
                                                {child.username}
                                            </span>
                                        </div>
                                        <Popconfirm
                                            title="Are you sure to delete this user?"
                                            onConfirm={() =>
                                                removeChild(
                                                    user.user_id,
                                                    child.userid
                                                )
                                            }
                                            id={child.userid}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className=" text-red-500 hover:text-red-700 cursor-pointer pr-3">
                                                <Delete />
                                            </button>
                                        </Popconfirm>
                                    </li>
                                );
                            })}
                        </ul>
                        <AddUserModal
                            user={user}
                            userList={showAddUserList}
                            showSelectedUserList={addChildUserList}
                        />
                    </div>
                    <div className="px-2  ">
                        <div>
                            <p className="text-base font-bold pt-4">
                                Users who have Manager Access to {user.username}
                                ’s account :
                            </p>
                        </div>
                        <ul className="px-4">
                            {showParentUserList.map((parent) => {
                                return (
                                    <li
                                        className="p-2 flex items-center justify-between font-medium border-b-[1px]"
                                        key={parent.userid}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-7 h-7 ">
                                                <ProfilePhoto user={parent} />
                                            </div>
                                            <span className="pl-2">
                                                {parent.username}
                                            </span>
                                        </div>
                                        <Popconfirm
                                            title="Are you sure to delete this user?"
                                            onConfirm={() =>
                                                removeParent(
                                                    parent.userid,
                                                    user.user_id
                                                )
                                            }
                                            id={parent.userid}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className=" text-red-500 hover:text-red-700 cursor-pointer pr-3">
                                                <Delete />
                                            </button>
                                        </Popconfirm>
                                    </li>
                                );
                            })}
                        </ul>
                        <ManageAccessModal
                            user={user}
                            userList={showAddUserList}
                            showSelectedUserList={addPrentUserList}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UserCard;

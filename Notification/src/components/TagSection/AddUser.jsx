import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button, Modal, Select, Avatar, Card, Popconfirm, message } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { DeleteCardIcon } from "../../Icons/icons";
import { userController } from "../Controller/index";

function AddUser(props) {
    const [visible, setVisible] = useState(false);

    const [userdata, setUserData] = useState({});

    const [userCardList, setUserCardList] = useState([]);

    const [buttonDisable, setButtonDisable] = useState(true);

    const [usersList, setUsersList] = useState([]);

    const onUserSelect = (value) => {
        usersList.map((user) => {
            if (user.user_id === value) {
                user.tagId = props.tagID;
                setUserData({ ...userdata, user });
            }
        });
        setButtonDisable(false);
    };

    const onAddUserClick = () => {
        setUserCardList([...userCardList, userdata.user]);
        setButtonDisable(true);

        const userList = usersList.filter((user) => {
            return user.username !== userdata.user.username;
        });
        setUsersList(userList);

        userController.addTagUser(userdata.user);
    };

    const onDeleteUserClick = (userId, tagId) => {
        const userFilterData = userCardList.filter((userData) => {
            return userData.user_id !== userId;
        });
        setUserCardList(userFilterData);

        const deletedUser = userFilterData
            .filter((user) => !userCardList.includes(user))
            .concat(
                userCardList.filter((user) => !userFilterData.includes(user))
            );

        setUsersList([...usersList, deletedUser[0]]);

        userController.deleteTagUser(tagId, userId);
    };

    const onTagNameClick = async (tagId) => {
        const usersUnderTag = await userController.getTagUserList(tagId);

        const userlist = props.usersList;

        const usersIdUnderTag = new Set(
            usersUnderTag.map((user) => user.user_id)
        );

        const addUserDropdownOptions = userlist.filter(
            (user) => !usersIdUnderTag.has(user.user_id)
        );

        setUserCardList(usersUnderTag);

        setUsersList(addUserDropdownOptions);
    };

    const { Meta } = Card;

    return (
        <div>
            <span
                className="font-medium hover:text-sky-500"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setVisible(true);
                    onTagNameClick(props.tagID);
                }}
            >
                {<TagOutlined style={{ fontSize: "18px" }} />} {props.tagName}
            </span>
            <Modal
                title="Add User"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={800}
                footer={false}
            >
                <div className="flex justify-center">
                    <Select
                        value={userdata.userName}
                        className="userListDropdown"
                        showSearch
                        style={{ width: "70%" }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onSelect={onUserSelect}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    >
                        {usersList.map((item, pos) => (
                            <Select.Option key={pos} value={item.user_id}>
                                {item.username}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button
                        className="addUserBtn ml-2"
                        type="primary"
                        onClick={onAddUserClick}
                        disabled={buttonDisable}
                    >
                        {" "}
                        Add User
                    </Button>
                </div>

                <div className="ChildDiv drop-shadow-md  flex flex-wrap gap-8 mx-8 overflow-auto mb-8">
                    {userCardList.map((card, pos) => {
                        return (
                            <Card
                                style={{
                                    width: 200,
                                    marginTop: 16,
                                }}
                                key={pos}
                                id={card.user_id}
                            >
                                <div className="flex ">
                                    <Meta
                                        avatar={
                                            <Avatar src={card.profilePic} />
                                        }
                                        title={card.username}
                                    />
                                    <Popconfirm
                                        title="Are you sure to delete this User?"
                                        onConfirm={() =>
                                            onDeleteUserClick(
                                                card.user_id,
                                                props.tagID
                                            )
                                        }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <span className="ml-8 ">
                                            <DeleteCardIcon />
                                        </span>
                                    </Popconfirm>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
}

export default AddUser;

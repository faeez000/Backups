import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UserCard from "./UserCard";
import { userService } from "../services/index";
import { BackButton } from "../../../shared/components/Icons";

function UserCardContainer() {
    const [userList, setUserList] = useState([
        // { username: "user1", user_id: "1" },
        // { username: "user2", user_id: "2" },
        // { username: "user3", user_id: "3" },
    ]);
    const [inputText, setInputText] = useState("");

    useEffect(async () => {
        const { success, users } = await userService.getUsers();

        if (!success) {
            return;
        }
        setUserList(users);
    }, []);

    const onSearch = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    return (
        <div>
            <div className="flex items-center pb-10">
                <a href="/settings/organization/roles-and-profiles">
                    <BackButton />
                </a>
                <h1 className="text-xl font-medium pl-1 m-0">Manage Access</h1>
            </div>
            <Input
                placeholder="input search text"
                allowClear
                bordered={false}
                onChange={onSearch}
                prefix={<SearchOutlined />}
                style={{
                    borderBottom: "1px solid lightgray",
                    outline: "none !important",
                }}
            />

            <h1 className="text-lg font-bold pt-3">Users</h1>
            <div className="flex flex-wrap gap-3">
                {userList
                    .filter((user) =>
                        user.username.toLowerCase().includes(inputText)
                    )
                    .map((user) => {
                        return (
                            <UserCard
                                key={user.user_id}
                                user={user}
                                userList={userList}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default UserCardContainer;

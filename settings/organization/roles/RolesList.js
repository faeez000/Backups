import React from "react";

import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { UserIcon } from "../../../../shared/components/Icons";

function RolesList() {
    const menu = (
        <Menu>
            <Menu.Item>
                <a>Edit</a>
            </Menu.Item>
            <Menu.Item>
                <a style={{ color: "red" }}>Delete</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <div className="flex justify-between items-center p-2 border-b-[1px]">
                <div className="flex items-center">
                    <UserIcon />
                    <h1 className="mx-1 my-0 text-[13px]">Role Name</h1>
                </div>
                <div>
                    <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        placement="bottomRight"
                        arrow={{ pointAtCenter: true }}
                    >
                        <MoreOutlined
                            size={"large"}
                            style={{ fontSize: "1.2rem" }}
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default RolesList;

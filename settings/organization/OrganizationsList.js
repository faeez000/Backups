import React from "react";
import { Sphere, UserIcon } from "../../../shared/components/Icons";
import { Button, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

function OrganizationsList(props) {
    const menu = (
        <Menu>
            <Menu.Item>
                <a>Switch</a>
            </Menu.Item>
            <Menu.Item>
                <a>Setting</a>
            </Menu.Item>
            <Menu.Item>
                <a>Leave</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <div className="flex justify-between items-center p-3 border-b-[1px]">
                <div className="flex items-center">
                    <UserIcon />
                    <h1 className="mx-1 my-0 ">Organization Name</h1>

                    {props.status}
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
                            style={{ fontSize: "1.3rem" }}
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default OrganizationsList;

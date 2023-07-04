import React, { Component } from "react";
import { Menu } from "antd";

class UserMenu extends Component {
    render() {
        return (
            <Menu className="bg-white border-2">
                <Menu.Item key="0">
                    <a href="https://www.antgroup.com">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="https://www.aliyun.com">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
    }
}

export default UserMenu;

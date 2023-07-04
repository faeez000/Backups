import React from "react";
import { Tabs } from "antd";
import Members from "./members/Members";
import Roles from "./roles/Roles";
import Profile from "./profile/Profile";
import Right from "./rights/Right";

function Users() {
    const { TabPane } = Tabs;
    return (
        <div className="mt-20">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Members" key="1">
                    <Members />
                </TabPane>
                <TabPane tab="Roles" key="2">
                    <Roles />
                </TabPane>
                <TabPane tab="Profile" key="3">
                    <Profile />
                </TabPane>
                <TabPane tab="Rights" key="4">
                    <Right />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Users;

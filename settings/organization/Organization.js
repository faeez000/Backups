import { Divider } from "antd";
import React from "react";
import OrganizationBody from "./OrganizationBody";
import OrganizationHead from "./OrganizationHead";
import Users from "./Users";

function Organization() {
    return (
        <div className="w-[38rem] max-w-full p-10 ">
            <OrganizationHead />
            <Divider />
            <OrganizationBody />
            <Users />
        </div>
    );
}

export default Organization;

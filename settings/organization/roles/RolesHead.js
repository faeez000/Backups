import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function RolesHead() {
    return (
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-base m-0">All Roles</h1>

            <Button style={{ borderRadius: "5px" }}>
                <Link to={"/settings/roles/new"}>New Role</Link>
            </Button>
        </div>
    );
}

export default RolesHead;

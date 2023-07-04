import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function OrganizationHead() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl m-0">Organizations</h1>

            <Button style={{ borderRadius: "5px" }}>
                <Link to={"/settings/organization/new"}>New</Link>
            </Button>
        </div>
    );
}

export default OrganizationHead;

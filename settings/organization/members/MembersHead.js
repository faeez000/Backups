import { Button } from "antd";
import { Link } from "react-router-dom";
import React from "react";

function MembersHead() {
    return (
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-base m-0">All Members</h1>

            <Button style={{ borderRadius: "5px" }}>
                <Link to={"/settings/members/new"}>New Member</Link>
            </Button>
        </div>
    );
}

export default MembersHead;

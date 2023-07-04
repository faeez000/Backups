import { Button } from "antd";
import { Link } from "react-router-dom";
import React from "react";

function RightHead() {
    return (
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-base m-0">All Rights</h1>

            <Button style={{ borderRadius: "5px" }}>
                <Link to={"/settings/right/new"}>New Right</Link>
            </Button>
        </div>
    );
}

export default RightHead;

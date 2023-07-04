import React from "react";
import RolesList from "./RolesList";

function RolesBody() {
    return (
        <div className="  rounded-lg border-[1px] bg-slate-50 ">
            <RolesList />
            <RolesList />
        </div>
    );
}

export default RolesBody;

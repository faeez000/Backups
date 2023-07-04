import React from "react";
import MembersList from "./MembersLIst";

function MembersBody() {
    return (
        <div className="  rounded-lg border-[1px] bg-slate-50 ">
            <MembersList />
            <MembersList />
        </div>
    );
}

export default MembersBody;

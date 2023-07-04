import React from "react";
import ProfileList from "./ProfileList";

function ProfileBody() {
    return (
        <div className="  rounded-lg border-[1px] bg-slate-50 ">
            <ProfileList />
            <ProfileList />
        </div>
    );
}

export default ProfileBody;

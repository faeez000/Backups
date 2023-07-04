import React from "react";
import ProfileBody from "./ProfileBody";
import ProfileHead from "./ProfileHead";

function Profile() {
    return (
        <div className="p-3">
            <ProfileHead />
            <ProfileBody />
        </div>
    );
}

export default Profile;

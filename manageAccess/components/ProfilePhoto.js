import React, { useEffect, useState } from "react";

function ProfilePhoto({ user }) {
    const [firstName, setFirstName] = useState(user.username);

    const [initials, setInitials] = useState(firstName.charAt(0));

    const [bgColor, setBgColor] = useState();

    useEffect(() => {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        var color = "rgb(" + x + "," + y + "," + z + ")";

        if (!bgColor) {
            return setBgColor(color);
        }
    }, []);

    return (
        <div className="w-[100%] h-[100%]">
            {user.profilePic ? (
                <img
                    src={user.profilePic}
                    alt=""
                    className="w-full h-full rounded-full"
                />
            ) : (
                <div
                    style={{ backgroundColor: bgColor }}
                    className="border  uppercase  text-white  rounded-full flex justify-center items-center w-full h-full"
                >
                    {initials}
                </div>
            )}
        </div>
    );
}

export default ProfilePhoto;

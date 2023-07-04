import { Divider } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function SettingNavigation() {
    const [isActive, setActive] = useState(true);
    const [inActive, setInActive] = useState(false);

    const toggleAccount = () => {
        setActive(true);
        setInActive(false);
    };
    const toggleOrganization = () => {
        setInActive(true);

        setActive(false);
    };

    return (
        <div className="w-[17rem] max-w-[16rem] p-10">
            <Link to={"/settings/account"}>
                <div
                    className={isActive ? "active" : "inactive"}
                    onClick={toggleAccount}
                >
                    <h1 className="text-base py-1 pl-5 pr-10 inline-block mb-0">
                        Account
                    </h1>
                </div>
            </Link>

            <Divider />
            <h1 className="text-xs">Access</h1>
            <Link to={"/settings/organization"}>
                <div
                    className={inActive ? "active" : "inactive"}
                    onClick={toggleOrganization}
                >
                    <h1 className="text-base py-1 pl-5 pr-10 inline-block mb-0">
                        Organization
                    </h1>
                </div>
            </Link>
        </div>
    );
}

export default SettingNavigation;

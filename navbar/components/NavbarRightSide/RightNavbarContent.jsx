import React, { Component } from "react";
import FeatureMenu from "./Menu/FeatureMenu";
import UserMenu from "./Menu/UserMenu";
import { Dropdown, Tooltip } from "antd";
import {
    NavFeatureIcon,
    NavHelpIcon,
    NavUserIcon,
} from "../../../../shared/components/Icons";

export default class RightNavbarContent extends Component {
    render() {
        const userMenu = <UserMenu />;
        const featureMenu = <FeatureMenu />;
        return (
            <div className="flex gap-3 mr-5">
                <Tooltip placement="left" title={"some information"}>
                    <div className="Tooltip flex items-center ">
                        <NavHelpIcon className="h-5 w-5" />
                    </div>
                </Tooltip>
                <Dropdown overlay={featureMenu} trigger={"click"}>
                    <div className="featureMenu cursor-pointer">
                        <NavFeatureIcon className="h-8 w-8" />
                    </div>
                </Dropdown>
                <Dropdown overlay={userMenu} trigger={"click"}>
                    <div className="profile cursor-pointer">
                        <NavUserIcon className="h-8 w-8" />
                    </div>
                </Dropdown>
            </div>
        );
    }
}

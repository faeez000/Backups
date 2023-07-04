import React, { Component } from "react";
import LeftNavbarContent from "./components/NavbarLeftSide/LeftNavbarContent";
import RightNavbarContent from "./components/NavbarRightSide/RightNavbarContent";

export default class Navbar extends Component {
    render() {
        return (
            <div className="pl-2 flex justify-between w-full items-center h-10 border-b">
                <LeftNavbarContent />
                <RightNavbarContent />
            </div>
        );
    }
}

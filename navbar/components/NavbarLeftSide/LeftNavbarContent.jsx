import React from "react";
import logo from "../../../../assets/clerverlyWorkLogo.jpg";

export default function LeftNavbarContent() {
    return (
        <div className="text-lg flex gap-2">
            <img src={logo} />
            Cleverly Work
        </div>
    );
}

import React, { Component } from "react";

class FeatureMenu extends Component {
    render() {
        return (
            <a
                style={{ textDecoration: "none", width: "3.5rem" }}
                href={this.props.to}
            >
                <div className="w-14 flex flex-col justify-center items-center">
                    <div className="cursor-pointer w-7 mb-1 text-center">
                        {this.props.icon}
                    </div>
                    <h1 className="text-center text-[11px] font-bold">
                        {this.props.feature}
                    </h1>
                </div>
            </a>
        );
    }
}

export default FeatureMenu;

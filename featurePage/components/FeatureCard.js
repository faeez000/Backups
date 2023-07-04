import React, { Component } from "react";
import { HelpIcon } from "../../../shared/components/Icons";

class FeatureCard extends Component {
    render() {
        return (
            <div className="relative">
                <a
                    className="bg-red-200"
                    style={{ textDecoration: "none" }}
                    href={this.props.to}
                >
                    <div className=" bg-white cursor-pointer max-w-md  rounded-lg border p-4 z-10 shadow-lg hover:shadow-2xl active:shadow-lg w-56 sm:w-48 md:w-56 lg:w-60 h-36 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-10 sm:w-10 sm:h-10 md:w-10 md:h-10">
                                {this.props.icon}
                            </div>
                        </div>
                        <div className="sm:w-12  text">
                            <h2 className="text-sm sm:text-sm md:text-lg font-bold">
                                {this.props.feature}
                            </h2>
                        </div>
                    </div>
                </a>
                <div className="absolute top-3 right-3">
                    <a
                        href="http://docs.cleverlywork.com/"
                        className=" hover:bg-blue-400"
                    >
                        <HelpIcon />
                    </a>
                </div>
            </div>
        );
    }
}

export default FeatureCard;

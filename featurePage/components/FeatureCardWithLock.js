import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeatureCardWithLock extends Component {
    render() {
        return (
            <Link to="#">
                <div className=" relative bg-[#f1f1f1] cursor-pointer max-w-md  rounded-lg border p-4 z-10 shadow-lg hover:shadow-2xl active:shadow-lg w-56 sm:w-48 md:w-56 lg:w-60 h-36 flex flex-col justify-between">
                    <div className=" right-3 bottom-3  absolute">
                        <img
                            src="https://w7.pngwing.com/pngs/485/864/png-transparent-padlock-s-locked-files-website-pin-tumbler-lock-padlock.png"
                            alt=""
                            className=" w-10 opacity-25 mx-auto"
                        />
                    </div>
                    <div className="flex justify-between items-start">
                        <div className="h-10 w-10 sm:w-10 sm:h-10 md:w-10 md:h-10">
                            {this.props.icon}
                        </div>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-slate-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="sm:w-12  text">
                        <h2 className="text-sm sm:text-sm md:text-lg font-bold">
                            {this.props.feature}
                        </h2>
                    </div>
                </div>
            </Link>
        );
    }
}

export default FeatureCardWithLock;

import React from "react";
import { HelpIcon } from "../../../shared/components/Icons";

class FeatureNavbar extends React.Component {
    render() {
        return (
            <section className="">
                <div className="flex justify-between items-center p-2 px-10 m-auto ">
                    <div>
                        <a href="#">
                            <img
                                className="h-10"
                                src="https://i.postimg.cc/x83m5NzD/logo2.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex ">
                        <div className="px-2 cursor-pointer">
                            <HelpIcon />
                        </div>
                        <div className="px-2 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default FeatureNavbar;

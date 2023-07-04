import SignInForm from "./SignInForm";
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { SignInWithGoogleButton } from "../Providers";

export default function SignIn() {
    return (
        <div
            className="flex justify-center items-center h-screen  m-auto p-12"
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("https://images.unsplash.com/photo-1640622307911-ee5870412ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div className="shadow-2xl md:rounded-xl rounded-xl md:w-[50rem]  bg-white">
                <div className="grid md:grid-cols-2">
                    <div className="hidden md:block shrink-0 ">
                        <img
                            className="md:rounded-l-xl h-full	"
                            src="https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxzZWFyY2h8NDF8fHRlY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="p-10">
                            <div className="text-center">
                                <h1
                                    className="text-2xl font-bold mb-8"
                                    style={{ color: "#8083FF" }}
                                >
                                    Sign In to CleverlyWork
                                </h1>
                            </div>

                            <SignInWithGoogleButton />

                            <Divider plain>or</Divider>

                            <SignInForm />

                            <div className="h-[32px] flex items-center justify-center">
                                <span className="pr-2">
                                    Don't have an account
                                </span>

                                <Link
                                    className="text-[#8083FF] "
                                    to={"/signup"}
                                >
                                    Register
                                </Link>
                            </div>
                            <Divider
                                plain
                                style={{ margin: "4px 0px" }}
                            ></Divider>

                            <div className="h-[32px] flex items-center justify-center">
                                <Link
                                    className="text-[#8083FF] px-[15px] py-1"
                                    to={""}
                                >
                                    Terms and Condition
                                </Link>
                                <Link
                                    className="text-[#8083FF] px-[15px] py-1"
                                    to={""}
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

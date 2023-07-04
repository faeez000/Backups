import { Divider } from "antd";
import SignUpWithEmailForm from "./SignUpWithEmailForm";

export default function SignUpWithEmail() {
    return (
        <div className="h-[100vh]">
            <div
                className="flex justify-center items-center  p-5 md:p-[4.1rem] overflow-auto"
                style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("https://images.unsplash.com/photo-1640622307911-ee5870412ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                }}
            >
                <div className="w-[25rem] bg-white  p-10 rounded-xl shadow-xl ">
                    <div className=" flex justify-center">
                        <a href="#">
                            <img
                                className="h-12"
                                src="https://www.cleverlywork.com/wp-content/uploads/2021/02/14cw.svg"
                                alt=""
                            />
                        </a>
                    </div>
                    <Divider />
                    <div>
                        <h1
                            className="text-2xl font-bold text-center"
                            style={{ color: "#8083FF" }}
                        >
                            Create New Account
                        </h1>
                        <SignUpWithEmailForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

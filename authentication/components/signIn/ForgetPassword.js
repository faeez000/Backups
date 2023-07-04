import { Input, Button, Divider, notification } from "antd";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback, useState } from "react";
import Hint from "../../../../shared/components/Hint";
import { sendPasswordResetEmail } from "../../../../shared/infra/firebase/firebase";

const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required(),
});

export default function ForgetPassword() {
    const [loader, setLoader] = useState(false);

    const handleOnSubmit = async (values) => {
        setLoader(true);

        const user = values;

        const { success } = await sendPasswordResetEmail(user.email);

        if (!success) {
            openNotification("error", "User doesn't exist");
            setLoader(false);

            return;
        }

        openNotification("info", "Reset password link sent to your email");
        setLoader(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: handleOnSubmit,
    });

    const setInputValue = useCallback(
        (key, value) => {
            return formik.setValues({
                ...formik.values,
                [key]: value,
            });
        },
        [formik]
    );

    const openNotification = (type, message, description = "") => {
        notification[type]({
            message,
            description,
            placement: "top",
        });
    };

    return (
        <div
            className="h-screen flex "
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("https://images.unsplash.com/photo-1640622307911-ee5870412ab5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}
        >
            <div className="w-[25rem] bg-white m-auto p-10 rounded-xl shadow-2xl">
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
                        Reset Your Password
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        <label className="px-0.5 font-semibold text-[0.8rem]">
                            Email
                        </label>
                        <Input
                            type={"email"}
                            style={{
                                borderRadius: "4px",
                            }}
                            name="email"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={(e) =>
                                setInputValue("email", e.target.value)
                            }
                        />
                        <div className="mb-3">
                            {formik.touched.email && formik.errors?.email && (
                                <div
                                    role="alert"
                                    className="ant-form-item-explain-error max-w-xs min-w-fit"
                                >
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>

                        <Button
                            style={{
                                background: "#8083FF",
                                borderRadius: "5px",
                                color: "white",
                                marginBottom: "0.5rem",
                            }}
                            block
                            loading={loader}
                            htmlType="submit"
                        >
                            Send Link To Reset Password
                        </Button>
                        <Button
                            style={{
                                color: "black",
                                textAlign: "center",
                                padding: "0",
                                fontSize: "14px",
                            }}
                            type="link"
                            block
                        >
                            Already have Account ?
                            <Link
                                style={{ color: "#8083FF", paddingLeft: "5px" }}
                                to={"/signin"}
                            >
                                Sign In
                            </Link>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

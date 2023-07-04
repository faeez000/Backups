import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
import { useCallback, useState } from "react";
import Hint from "../../../../shared/components/Hint";
import {
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "../../../../shared/infra/firebase/firebase";

YupPassword(yup);

const signInSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
});

export default function SignInForm() {
    const navigate = useNavigate();
    const [hint, setHint] = useState({ message: "", display: false, type: "" });
    const [loader, setLoader] = useState(false);

    const handleOnSubmit = async (values) => {
        setLoader(true);

        const user = values;
        const signInResult = await signInWithEmailAndPassword(
            user.email,
            user.password
        );
        if (!signInResult.success) {
            setHint({ display: false });
            setHint({
                message: signInResult.message,
                display: true,
                type: "error",
            });
            setLoader(false);
            return;
        }
        if (!signInResult.user.emailVerified) {
            setHint({ display: false });
            setHint({
                message:
                    "Please Verify, Verification link is sent to your Email",
                display: true,
                type: "error",
            });
            await sendEmailVerification();
            setLoader(false);
            return;
        }

        navigate("/features", { replace: true });
        setLoader(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: signInSchema,
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

    return (
        <div className="flex justify-center flex-col items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                <div className="w-full my-2">
                    {hint.display && (
                        <Hint message={hint.message} type={hint.type} />
                    )}
                </div>
                <div className="mb-3">
                    <label className="px-0.5 font-semibold text-[0.8rem]">
                        Email
                    </label>
                    <Input
                        style={{
                            borderRadius: "4px",
                        }}
                        type={"email"}
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={(e) => setInputValue("email", e.target.value)}
                    />
                    <div>
                        {formik.touched.email && formik.errors.email && (
                            <div
                                role="alert"
                                className="ant-form-item-explain-error max-w-xs min-w-fit"
                            >
                                {formik.errors.email}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-6">
                    <label className="px-0.5 font-semibold text-[0.8rem]">
                        Password
                    </label>
                    <Input.Password
                        style={{ borderRadius: "5px" }}
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                            setInputValue("password", e.target.value)
                        }
                    />
                    <div>
                        {formik.touched.password && formik.errors?.password && (
                            <div
                                role="alert"
                                className="ant-form-item-explain-error max-w-xs min-w-fit"
                            >
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    style={{
                        background: "#8083FF",
                        borderRadius: "4px",
                        color: "white",
                        marginBottom: "0.5rem",
                    }}
                    loading={loader}
                    block
                    htmlType="submit"
                >
                    SIGN IN
                </Button>
                <div className="w-full flex justify-center">
                    <Link className="text-[#8083FF]" to={"/forget-password"}>
                        Forgot Password
                    </Link>
                </div>
            </form>
        </div>
    );
}

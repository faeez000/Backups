import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import "yup-phone";
import { useFormik } from "formik";
import {
    Input,
    Button,
    Divider,
    Select,
    Alert,
    message,
    AutoComplete,
} from "antd";
import { InfoCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { async } from "@firebase/util";
import { userAPIService } from "../../../../shared/infra/service";
import Hint from "../../../../shared/components/Hint";
import countries from "../../../form/components/Fields/data/countries";
import {
    sendEmailVerification,
    signOut,
    signUpWithEmailAndPassword,
} from "../../../../shared/infra/firebase/firebase";
import { otpService } from "../../services";

YupPassword(yup);

const signUpSchema = yup.object().shape({
    fullName: yup.string().min(4).max(20).required(),
    username: yup.string().min(4).max(20).required(),
    phone: yup.string().phone().required(),
    email: yup.string().email().required(),
    password: yup.string().password().min(8).max(20).required(),
});

const inputStyle = {
    borderRadius: "5px",
};

export default function SignUpWithEmailForm() {
    const navigate = useNavigate();
    const [hint, setHint] = useState({ message: "", display: false, type: "" });
    const [loader, setLoader] = useState(false);
    const [otp, setOtp] = useState();
    const [visible, setVisible] = useState(false);
    const [sendOtpLinkVisible, setSendOtpLinkVisible] = useState(true);
    const [success, setSuccess] = useState(true);
    const [verified, setVerified] = useState(false);
    const [countryCode, setCountryCode] = useState("91");

    const handleOnSubmit = async (values) => {
        setLoader(true);
        const user = values;
        const usernameResult = await userAPIService.usernameExist(
            user.username
        );

        if (usernameResult.exist) {
            setHint({ display: false });
            setHint({
                message: "Username already Taken. Try another",
                type: "error",
                display: true,
            });

            formik.setFieldTouched("username", true);
            formik.setFieldError(
                "username",
                "Username already taken. Try another one"
            );

            setLoader(false);

            return;
        }

        const signupResult = await signUpWithEmailAndPassword(
            user.email,
            user.password
        );
        if (!signupResult.success) {
            setHint({ display: false });
            setHint({
                message: signupResult.message,
                type: "info",
                display: true,
            });

            setLoader(false);

            return;
        }

        user["id"] = signupResult.user.uid;
        const saveUserResult = await userAPIService.signupNewUser(user);
        if (!saveUserResult.success) {
            setHint({ display: false });
            setHint({
                message: saveUserResult.message,
                type: "info",
                display: true,
            });

            setLoader(false);

            return;
        }
        await sendEmailVerification();
        setHint({ display: false });
        setHint({
            message: "Please Verify, Verification link is sent to your Email",
            type: "info",
            display: true,
        });
        await signOut();
        navigate("/signin", { replace: true });

        setLoader(false);
    };

    const formik = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            email: "",
            phone: "",
            password: "",
        },
        validationSchema: signUpSchema,
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

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };
    const handleSendOtp = async () => {
        if (!formik.values.phone) {
            message.warn("Please Fill Mobile Number");
            return;
        }
        const { success } = await otpService.sendOTP(
            countryCode + formik.values.phone
        );

        if (!success) {
            message.error("Failed to send OTP");
            return;
        }
        message.success("OTP Send SuccessFully");
        setVisible(true);
        setSendOtpLinkVisible(false);
    };

    const handleresendOtp = async () => {
        if (!formik.values.phone) {
            message.warn("Please Fill Mobile Number");
            return;
        }

        const { success, messages } = await otpService.reSendOTP(
            countryCode + formik.values.phone
        );

        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);

        setVisible(true);
        setSendOtpLinkVisible(false);
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            message.warn("Please Fill OTP");
            return;
        }
        const { success, messages } = await otpService.verifyOTP(
            countryCode + formik.values.phone,
            otp
        );
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        setSuccess(false);
        setVerified(true);
    };

    const handleCountryChange = (value) => {
        if (isNaN(value)) return;
        setCountryCode(value);
    };

    const getUniuqeCountryCode = () => {
        const countryCodeSet = new Set();
        countries.forEach((country) => countryCodeSet.add(country.code));
        return [...countryCodeSet];
    };
    const countrieCodeOptions = getUniuqeCountryCode().map((countryCode) => ({
        value: countryCode,
    }));

    return (
        <>
            <div style={{ height: "40px" }}>
                {hint.display && (
                    <Hint message={hint.message} type={hint.type} time="4000" />
                )}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                <div className="my-3">
                    <label className="px-0.5 text-[0.8rem] font-semibold">
                        Full Name
                    </label>
                    <Input
                        style={inputStyle}
                        value={formik.values["fullName"]}
                        name="fullName"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                            setInputValue("fullName", e.target.value)
                        }
                    />
                    <div>
                        {formik.touched.fullName && formik.errors?.fullName && (
                            <div
                                role="alert"
                                className="ant-form-item-explain-error max-w-xs min-w-fit"
                            >
                                {formik.errors.fullName}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="px-0.5 text-[0.8rem] font-semibold">
                        Username
                    </label>
                    <Input
                        style={inputStyle}
                        value={formik.values.username}
                        name="username"
                        onBlur={formik.handleBlur}
                        onChange={(e) =>
                            setInputValue("username", e.target.value)
                        }
                    />
                    <div>
                        {formik.touched.username && formik.errors?.username && (
                            <div
                                role="alert"
                                className="ant-form-item-explain-error max-w-xs min-w-fit"
                            >
                                {formik.errors.username}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="px-0.5 text-[0.8rem]  font-semibold">
                        Email
                    </label>
                    <Input
                        style={inputStyle}
                        type={"email"}
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={(e) => setInputValue("email", e.target.value)}
                    />
                    <div>
                        {formik.touched.email && formik.errors?.email && (
                            <div
                                role="alert"
                                className="ant-form-item-explain-error max-w-xs min-w-fit"
                            >
                                {formik.errors.email}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <label className="px-0.5 text-[0.8rem] font-semibold">
                        Phone
                    </label>
                    <Input.Group compact>
                        <AutoComplete
                            placeholder="country code"
                            options={countrieCodeOptions}
                            disabled={verified}
                            value={countryCode}
                            onChange={handleCountryChange}
                            style={{ width: "20%" }}
                        />
                        <Input
                            style={{ width: "80%" }}
                            name="phone"
                            type={"tel"}
                            disabled={verified}
                            value={formik.values.phone}
                            suffix={
                                success ? (
                                    <InfoCircleOutlined
                                        style={{
                                            color: "red",
                                        }}
                                    />
                                ) : (
                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                )
                            }
                            onBlur={formik.handleBlur}
                            onChange={(e) =>
                                setInputValue("phone", e.target.value)
                            }
                        />
                    </Input.Group>
                    <Button
                        className="p-0 text-sm"
                        size="small"
                        style={{
                            display: sendOtpLinkVisible ? "block" : "none",
                            color: "#8083FF",
                        }}
                        type="link"
                        onClick={handleSendOtp}
                    >
                        Send OTP
                    </Button>
                    <Button
                        style={{
                            display: visible ? "block" : "none",
                            color: "#8083FF",
                        }}
                        type="link"
                        className="p-0 text-sm"
                        onClick={handleresendOtp}
                    >
                        Resend OTP
                    </Button>
                    <div>
                        {formik.touched.phone && formik.errors?.phone && (
                            <div
                                role="alert"
                                className="ant-form-item-explain-error max-w-xs min-w-fit"
                            >
                                {formik.errors.phone}
                            </div>
                        )}
                    </div>
                    <div style={{ display: visible ? "block" : "none" }}>
                        <Input
                            style={inputStyle}
                            value={otp}
                            onChange={handleOtpChange}
                        />
                        <Button
                            className="p-0"
                            type="link"
                            style={{ color: "#8083FF" }}
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </Button>
                    </div>
                </div>

                <div className="my-3">
                    <label className="px-0.5 text-[0.8rem] block font-semibold">
                        Password
                    </label>
                    <Input.Password
                        style={inputStyle}
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

                <div className="mt-3">
                    <span className="pr-2">
                        By Clicking Sign Up, you agree to our
                    </span>
                    <Link to={""}>Terms</Link>,
                    <Button
                        style={{
                            color: "#8083FF",
                            padding: "0",
                        }}
                        type="link"
                    >
                        <Link to={""}>Privacy and Cookie Policy</Link>
                    </Button>
                </div>

                <Button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#8083FF",
                        borderRadius: "5px",
                        color: "#FFF",
                        marginBottom: "0.5rem",
                    }}
                    block
                    htmlType="submit"
                    loading={loader}
                    disabled={success}
                >
                    SIGN UP
                </Button>

                <Button
                    style={{
                        color: "black",
                        textAlign: "start",
                        padding: "0",
                        fontSize: "14px",
                    }}
                    type="link"
                    block
                >
                    Already have Account ?
                    <Link
                        style={{
                            color: "#8083FF",
                            paddingLeft: "5px",
                        }}
                        to={"/signin"}
                    >
                        Sign In
                    </Link>
                </Button>
            </form>
        </>
    );
}

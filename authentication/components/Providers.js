import { Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleColorIcon } from "../../../shared/components/Icons";
import {
    getRedirectResult,
    redirectResult,
    signInWithGoogle,
} from "../../../shared/infra/firebase/firebase";
import { userAPIService } from "../../../shared/infra/service";
import UserAuthModel from "../domain/UserAuthModel";

const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.9rem",
    textAlign: "center",
};

function Wrapper({ children }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="m-2"></div>
            {children}
        </div>
    );
}

export function SignInWithGoogleButton() {
    const navigate = useNavigate();

    async function handleClick() {
        const result = await signInWithGoogle();

        if (!result.success) {
            return;
        }
        const username = result.user.displayName + result.user.uid;

        const user = new UserAuthModel(
            result.user.displayName,
            username,
            result.user.email,
            result.user.phoneNumber,
            result.user.uid
        );
        const saveUserResult = await userAPIService.signupNewUser(user);

        if (result.success) {
            navigate("/features", { replace: true });
            return;
        }
        return;
    }

    return (
        <Wrapper>
            <Button
                shape="round"
                size={"small"}
                style={buttonStyle}
                onClick={async () => {
                    await handleClick();
                }}
            >
                <span>
                    <GoogleColorIcon />
                </span>
                <span className="ml-2 text-center">
                    <b>Sign In with Google</b>
                </span>
            </Button>
        </Wrapper>
    );
}

export function SignUpWithEmailButton() {
    return (
        <Wrapper>
            <Button size={"large"} style={buttonStyle}>
                <span className="ml-2">
                    <Link to={"/signup-with-email"}>
                        <b> Sign Up With Email</b>
                    </Link>
                </span>
            </Button>
        </Wrapper>
    );
}

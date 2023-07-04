import { message as showPopup  } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

const showSuccess = (message) => {
    showPopup.success({
        content: " ",
        className: "custom-class fixed right-10 top-20",
        icon: (
            <span
                role="img"
                aria-label="check-circle"
                className="anticon anticon-check-circle flex items-center"
            >
                <CheckCircleFilled />
                <span className="text-sm ">
                    {message
                        ? `${message[0].toUpperCase()}${message
                              .slice(1)
                              .toLowerCase()}`
                        : "Successful"}
                </span>
            </span>
        ),
    });
};

const showError = (message) => {
    showPopup.error({
        content: " ",
        className: "custom-class fixed right-10 top-20",
        icon: (
            <span
                role="img"
                aria-label="close-circle"
                className="anticon anticon-close-circle flex items-center"
            >
                <CloseCircleFilled />
                <span className="text-sm">
                    {message
                        ? `${message[0].toUpperCase()}${message
                              .slice(1)
                              .toLowerCase()}`
                        : "Failed"}
                </span>
            </span>
        ),
    });
};

export function showSuccessOrFailureMessagePopUp({ success, message }) {
    success ? showSuccess(message) : showError(message);
}
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
    <LoadingOutlined
        style={{ fontSize: 21, right: "-15px", left: "auto" }}
        spin
    />
);

export function FieldSpinner({ spinning, children } = { spinning: true }) {
    return (
        <Spin
            className="d-flex flex-row justify-end items-center z-50  w-full"
            spinning={spinning}
            indicator={antIcon}
        >
            {children}
        </Spin>
    );
}

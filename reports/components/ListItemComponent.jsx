import { List, Tag } from "antd";
import {
    FormOutlined,
    SelectOutlined,
    BarChartOutlined,
    LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { memo } from "react";

const ListItemComponent = (props) => {
    return (
        <List.Item
            actions={[
                <Link to={`/reports/${props.formId}`}>
                    <SelectOutlined rotate={90} title="View Report" />
                </Link>,
                props.form.canAdd ? (
                    <Link to={`/forms/${props.formId}/new`}>
                        <FormOutlined title="Add Entry" />
                    </Link>
                ) : (
                    <LockOutlined
                        style={{ fontSize: "16px" }}
                        title="Permission denied"
                    />
                ),
            ]}
        >
            <List.Item.Meta
                avatar={<BarChartOutlined />}
                title={
                    <Link to={`/reports/${props.formId}`}>
                        {props.formName}
                    </Link>
                }
            />
            {props.formType ? (
                <Tag color={props.formType === "Grid" ? "blue" : "purple"}>
                    {props.formType}
                </Tag>
            ) : (
                <Tag color="red">None</Tag>
            )}
        </List.Item>
    );
};

export default memo(ListItemComponent);

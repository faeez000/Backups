import { Space } from "antd";
import { DeleteComponentWithConfirm } from "../../shared/components/DeleteComponentWithConfirm";

export function getColumnWithActions(deletFunction) {
    return {
        title: "Action",
        key: "action",
        render: (record) => {
            return (
                <Space size="middle">
                    <a>Edit</a>
                    <DeleteComponentWithConfirm
                        itemName={record.name}
                        deletFunction={deletFunction}
                        deleteKey={record.id}
                    />
                </Space>
            );
        },
    };
}

import { Popconfirm } from "antd";

export function DeleteComponentWithConfirm({
    itemName,
    deletFunction,
    deleteKey,
}) {
    return (
        <Popconfirm
            placement="rightTop"
            title={`Do you wants to delete ${itemName}`}
            onConfirm={() => deletFunction(deleteKey)}
            okText="Yes"
            cancelText="No"
        >
            Delete
        </Popconfirm>
    );
}

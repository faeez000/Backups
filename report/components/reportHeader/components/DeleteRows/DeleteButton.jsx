import { Popconfirm } from "antd";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { DeleteIcon } from "../../../../../../shared/components/Icons";
import { useAgGridContext } from "../../../../context/AgGridContext";
import { UserRightsContext } from "../../../../context/UserRightContext";
import { reportController } from "../../../../controller";
import { reportButtonClassList } from "../../utils/ButtonClassName";

export default function DeleteButton(props) {
    const context = useAgGridContext();
    const { formId } = useParams();

    function getSelectedNodesArray(selectedNodesMap) {
        let selectedIdArray = Array.from(selectedNodesMap.keys());
        return selectedIdArray;
    }

    function getSelectedNodesMap() {
        const selectedNodesMap = new Map();
        const selectedNodes = context.gridApi.getSelectedNodes();
        selectedNodes.forEach((node) => {
            selectedNodesMap.set(node.data.id, node.data);
        });
        return selectedNodesMap;
    }

    function deleteRowsFromState(selectedNodesMap) {
        props.setRowData((state) =>
            state.filter((item) => !selectedNodesMap.has(item.id))
        );
    }

    const handleDelete = async () => {
        let selectedNodesMap = getSelectedNodesMap();
        let selectedIdArray = getSelectedNodesArray(selectedNodesMap);
        const isDeleted = await reportController.deleteRowById(
            formId,
            selectedIdArray
        );

        if (!isDeleted) {
            console.log("error : something went wrong while Deleting the Rows");
            return;
        }
        deleteRowsFromState(selectedNodesMap);
    };

    function onConfirm(e) {
        handleDelete();
    }

    const userRightsContext = useContext(UserRightsContext);

    const { isButtonDisabled, visibilityByUserAccess } =
        userRightsContext.getAttributesByUserAccess("DELETE");

    return (
        <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={onConfirm}
            okText="Yes"
            cancelText="No"
            disabled={isButtonDisabled}
        >
            <button
                className={`${reportButtonClassList} ${visibilityByUserAccess}`}
            >
                <DeleteIcon className="h-5 w-5" />
                <span className="self-center text-base whitespace-nowrap">
                    Delete
                </span>
            </button>
        </Popconfirm>
    );
}

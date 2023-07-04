import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { EditIcon } from "../../../../../../shared/components/Icons";
import { useAgGridContext } from "../../../../context/AgGridContext";
import { Alert } from "antd";
import { reportButtonClassList } from "../../utils/ButtonClassName";
import { showSuccessOrFailure } from "../../../../modules/showSuccessOrFailure";
import { UserRightsContext } from "../../../../context/UserRightContext";

export default function EditButton() {
    const context = useAgGridContext();
    const navigateTo = useNavigate();
    const { formId } = useParams();

    const handleEditItem = () => {
        const selectedNodes = context.gridApi.getSelectedNodes();
        if (selectedNodes.length !== 1) {
            return showSuccessOrFailure({
                success: false,
                message: "Please select single row",
            });
        }
        navigateTo(
            `/forms/${formId}/edit?recordId=${selectedNodes[0].data.id}`,
            { replace: true }
        );
    };

    const userRightsContext = useContext(UserRightsContext);

    const { isButtonDisabled, visibilityByUserAccess } =
        userRightsContext.getAttributesByUserAccess("EDIT");

    return (
        <>
            <button
                className={`${reportButtonClassList} ${visibilityByUserAccess}`}
                onClick={handleEditItem}
                disabled={isButtonDisabled}
            >
                <EditIcon className="h-5 w-5" />
                <span className="self-center text-base whitespace-nowrap">
                    Edit
                </span>
            </button>
        </>
    );
}

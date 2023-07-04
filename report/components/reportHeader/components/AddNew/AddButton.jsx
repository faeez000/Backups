import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AddPlusIcon } from "../../../../../../shared/components/Icons";
import { UserRightsContext } from "../../../../context/UserRightContext";

export default function AddButton() {
    const navigateTo = useNavigate();
    let { formId } = useParams();

    const AddItem = () => {
        navigateTo(`/forms/${formId}/new`);
    };
    const userRightsContext = useContext(UserRightsContext);

    const { isButtonDisabled, visibilityByUserAccess } =
        userRightsContext.getAttributesByUserAccess("ADD");

    return (
        <button
            className={`rounded-sm border-0 items-center flex bg-violet-500 ${visibilityByUserAccess}`}
            disabled={isButtonDisabled}
            onClick={AddItem}
        >
            <span className="px-1 text-white">
                <AddPlusIcon className="h-5 w-5" />
            </span>
            <span className="rounded-tr-sm rounded-b-sm pr-2 py-2 text-white  text-sm font-semibold whitespace-nowrap">
                Add New
            </span>
        </button>
    );
}

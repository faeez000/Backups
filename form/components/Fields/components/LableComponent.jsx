import React from "react";

export default function LableComponent(props) {
    const { fieldId, isFieldManadatory, fieldName } = props;
    return (
        <label className="text-sm color-[#000000d9] mb-1" htmlFor={fieldId}>
            {isFieldManadatory && <span className="text-red-600">*</span>}
            {fieldName}
        </label>
    );
}

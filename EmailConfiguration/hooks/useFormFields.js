import { useState } from "react";

export const useFormFields = (initialState) => {
    const [fields, setValues] = useState(initialState);

    const handelSelectField = (value, fieldName) => {
        setValues({
            ...fields,
            [fieldName]: value,
        });
    };

    const clearFields = () => {
        let cloneFields = { ...fields };
        for (let field in cloneFields) {
            cloneFields[field] = "";
        }
        setValues({
            ...cloneFields,
        });
    };

    function handleFieldsChange(event) {
        if (event.target) {
            setValues({
                ...fields,
                [event.target.name]: event.target.value,
            });
        }
    }

    return [
        fields,
        setValues,
        handleFieldsChange,
        handelSelectField,
        clearFields,
    ];
};

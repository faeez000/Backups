import { Input } from "antd";
import React from "react";
import { useFormFields } from "../../hooks/useFormFields";
import { smsTempVariableAPIservice } from "../../services";
import { variableConfigController } from "../controllers";

export default function AddNewVariableNameSetup({
    handleAddProperty,
    smsTemplateId,
    templateConfigData,
}) {
    const [fields, setValues, handleFieldsChange, handelSelectField] =
        useFormFields({
            variableName: "",
        });

    function isVariableNameAlreadyExist(configName) {
        return (
            templateConfigData.findIndex(
                (config) => config.variableName === configName
            ) >= !-1
        );
    }

    async function handlAddNewVariable(variableName) {
        if (isVariableNameAlreadyExist(variableName)) {
            return alert("Variablename already exist");
        }

        const variableDTO = { variableName: variableName };
        const isVariableAdded = await variableConfigController.addVariable(
            smsTemplateId,
            variableDTO
        );
        if (isVariableAdded) {
            handleAddProperty(variableName);
            setValues({variableName:""})
        }
    }

    return (
        <div className="">
            <div className="flex">
                <label className="pr-2 font-semibold whitespace-nowrap">
                    Variable Name
                </label>
                <Input
                    name="variableName"
                    value={fields.variableName}
                    onChange={handleFieldsChange}
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => handlAddNewVariable(fields.variableName)}
                    type="button"
                    className="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Add
                </button>
            </div>
        </div>
    );
}

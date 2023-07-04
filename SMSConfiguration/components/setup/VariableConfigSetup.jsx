import { Select, Typography, Spin, Popconfirm } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { elementController, variableConfigController } from "../controllers";
import AddNewVariableNameConfig from "../config/AddNewVariableNameConfig";
import { useCallback } from "react";
import { smsTempVariableAPIservice } from "../../services";
const { Option } = Select;
const { Paragraph } = Typography;

export default function VariableConfigSetup({
    templateConfigData,
    handleAddProperty,
    handleEditProperty,
    handleDeleteProperty,
    forms,
    selectedForm,
    handleFormChange,
    smsTemplateId,
}) {
    const [elementOptions, setElementOptions] = useState([]);
    const [mobileElements, setMobileElements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const selectedFormID = selectedForm?.formId;

    const fetchAndSetElements = useCallback(() => {
        return (async function () {
            const elements =
                await elementController.getElementsByFormIdFromBuilder(
                    selectedFormID
                );
            const mobileElements =
                await elementController.getElementsWithTeleByFormId(
                    selectedFormID
                );
            if (elements && mobileElements) {
                setElementOptions(getOptionsSet(elements));
                setMobileElements(mobileElements);
                setIsLoading(false);
            }
        })();
    }, [selectedFormID]);

    useEffect(() => {
        fetchAndSetElements();
    }, [selectedFormID, fetchAndSetElements]);

    const handleElementChange = (variableName, value) => {
        handleEditProperty(variableName, {
            elementId: elementOptions[value].elementId,
        });
    };

    const handleMobileElementChange = (variableName, value) => {
        handleEditProperty(variableName, {
            elementId: value,
        });
    };

    const handleDeleteVariable = async (variableName, variableId) => {
        const idDeleted = await variableConfigController.deleteVariable(
            smsTemplateId,
            variableId
        );
        if (idDeleted) {
            handleDeleteProperty(variableName);
        }
    };

    function getOptionsSet(elements) {
        let optionsSet = {};
        elements.forEach((element) => {
            optionsSet[element.id] = {
                elementId: element.id,
                elementName: element.property.name,
            };
        });
        return optionsSet;
    }

    const eleOptionsComponent = Object.values(elementOptions).map((element) => (
        <Option key={element.elementId} value={element.elementId}>
            {element.elementName}
        </Option>
    ));

    const mobileElementsOptions = mobileElements.map((element) => (
        <Option key={element.elementId} value={element.elementId}>
            {element.elementName}
        </Option>
    ));

    const isElementIdPresentInOptions = (options, elementId)=>{
        return options.find((option)=>option.key === elementId)
    }

    return isLoading ? (
        <div className="flex h-[200px] justify-center items-center">
            <Spin />
        </div>
    ) : (
        <>
            <div className="flex py-3 pl-3">
                <div className="pr-6 text-base font-semibold">Form</div>
                <Select
                    defaultValue={selectedFormID || "Select Form"}
                    onChange={handleFormChange}
                    className="w-full"
                    allowClear
                >
                    {forms.map((form, index) => (
                        <Option key={index} value={form.formId}>
                            {form.form_name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="flex justify-end">
                <AddNewVariableNameConfig
                    templateConfigData={templateConfigData}
                    smsTemplateId={smsTemplateId}
                    handleAddProperty={handleAddProperty}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 bg-gray-50  ">
                        <tr>
                            <th scope="col" className="pl-3 py-3 border-r">
                                Variable Name
                            </th>
                            <th scope="col" className="pl-4 py-3 border-r">
                                ElementName
                            </th>
                            <th scope="col" className="pl-4 py-3 ">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {templateConfigData.map((templateConfig, index) => {
                            if (templateConfig.variableName === "mobiles") {
                                return tableRowForMobileElements(
                                    index,
                                    templateConfig,
                                    handleMobileElementChange,
                                    mobileElementsOptions,
                                    isElementIdPresentInOptions
                                );
                            }
                            return tableRowForOtherElements(
                                index,
                                templateConfig,
                                handleElementChange,
                                eleOptionsComponent,
                                handleDeleteVariable,
                                isElementIdPresentInOptions
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
function tableRowForOtherElements(
    index,
    templateConfig,
    handleElementChange,
    eleOptionsComponent,
    handleDeleteVariable,
    isElementIdPresentInOptions
) {

    
    
    return (
        <tr className="bg-white border-b " key={index}>
            <th
                scope="row"
                className="pl-3 py-2 font-medium text-gray-900  whitespace-nowrap border-r"
            >
                <Paragraph>{templateConfig.variableName}</Paragraph>
            </th>
            <td className="px-3 py-2 border-r">
                <Select
                    value={isElementIdPresentInOptions(eleOptionsComponent, templateConfig.elementId) ? templateConfig.elementId : ""}
                    className="w-full"
                    onChange={(value) =>
                        handleElementChange(templateConfig.variableName, value)
                    }
                    allowClear
                >
                    {eleOptionsComponent}
                </Select>
            </td>
            <td className="px-0 py-2 text-center">
                <Popconfirm
                    title="Are you sure to delete this variable?"
                    onConfirm={() =>
                        handleDeleteVariable(
                            templateConfig.variableName,
                            templateConfig.id
                        )
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <span className="font-medium text-blue-600  hover:underline cursor-pointer">
                        Delete
                    </span>
                </Popconfirm>
            </td>
        </tr>
    );
}

function tableRowForMobileElements(
    index,
    templateConfig,
    handleMobileElementChange,
    mobileElementsOptions,
    isElementIdPresentInOptions
) {
    return (
        <tr className="bg-white border-b " key={index}>
            <th
                scope="row"
                className="pl-3 py-2 font-medium text-gray-900  whitespace-nowrap border-r"
            >
                <Paragraph>Mobiles</Paragraph>
            </th>
            <td className="px-3 py-2 border-r">
                <Select
                    value={isElementIdPresentInOptions(mobileElementsOptions,templateConfig.elementId) ? templateConfig.elementId  : ""}
                    className="w-full"
                    onChange={(value) =>
                        handleMobileElementChange(
                            templateConfig.variableName,
                            value
                        )
                    }
                    allowClear
                >
                    {mobileElementsOptions}
                </Select>
            </td>
            <td className="px-0 py-2 text-center">
                <span className="font-medium cursor-not-allowed">Delete</span>
            </td>
        </tr>
    );
}

import React, { Component } from "react";
import { GridFormContext } from "../../../../context/GridFormContext";
import { fieldMap } from "../../../../core/fieldMap";
import MainSection from "./MainSection/MainSection";
import BottomSection from "./BottomSection/BottomSection";

class GridFormWithSectionFields extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, value) {
        this.context.updateFormData(key, value);
    }

    isObjEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    divideElements(dividerElementsMap, fieldsArr) {
        const elementsWithSections = [];
        const dividerElementIndexArr = Object.keys(dividerElementsMap);

        for (let i = 0; i < dividerElementIndexArr.length; i++) {
            if (dividerElementIndexArr[i + 1]) {
                elementsWithSections.push({
                    dividerElement:
                        dividerElementsMap[dividerElementIndexArr[i]],
                    dividedElements: fieldsArr.slice(
                        Number(dividerElementIndexArr[i]) + 1,
                        dividerElementIndexArr[i + 1]
                    ),
                });
            } else {
                elementsWithSections.push({
                    dividerElement:
                        dividerElementsMap[dividerElementIndexArr[i]],
                    dividedElements: fieldsArr.slice(
                        Number(dividerElementIndexArr[i]) + 1
                    ),
                });
            }
        }

        return elementsWithSections;
    }

    getNonDividedFields(
        fieldsArr,
        isNonDividedFields,
        lastIndexOfNonDividedFields
    ) {
        if (
            isNonDividedFields &&
            lastIndexOfNonDividedFields &&
            lastIndexOfNonDividedFields > 0
        ) {
            return fieldsArr.slice(0, lastIndexOfNonDividedFields);
        } else if (isNonDividedFields) return fieldsArr;
        else return [];
    }

    getSlicedFields(fieldsArr, startIndex, endIndex) {
        if (!fieldsArr) return [];
        if (startIndex === null) return [];
        if (startIndex !== null && !endIndex) {
            return fieldsArr.slice(startIndex);
        }
        return fieldsArr.slice(startIndex, endIndex);
    }

    render() {
        const {
            bottomElements,
            bottomElementsData,
            formId,
            bulkUpdateFormData,
            getElementId,
            autofetch,
            bottomSectionFormulaEvaluator,
            onLoadQuery,
            bottomSectionOnChangeQuery,
            buttonActionExecutor,
            bottomSectionSetConditionalOptions
        } = this.context;

        const bottomFields = [];
        const dividerElementsMap = {};

        const upperDividerElementsMap = {};
        const lowerDividerElementsMap = {};
        let indexOfUpperLowerDivider = null;
        let lowerIsNonDividedFields = null;
        let lowerlastIndexOfNonDividedFields = null;
        let upperLastIndexOfNonDividedFields = null;
        let upperIsNonDividedFields =
            bottomElements[0]?.name !== "BottomSectionDivider" && bottomElements[0]?.name !== "BottomDivider";
        bottomElements.forEach((element, index) => {
            if (element.name === "BottomDivider") {
                lowerIsNonDividedFields =
                    bottomElements[index + 1]?.name !== "BottomSectionDivider";
                indexOfUpperLowerDivider = index;

                dividerElementsMap[index] = element;
            } else if (element.name === "BottomSectionDivider") {
                if (
                    upperIsNonDividedFields &&
                    !upperLastIndexOfNonDividedFields
                ) {
                    upperLastIndexOfNonDividedFields = index;
                }
                if (
                    lowerIsNonDividedFields &&
                    !lowerlastIndexOfNonDividedFields
                ) {
                    lowerlastIndexOfNonDividedFields =
                        index - indexOfUpperLowerDivider;
                }
                if (
                    indexOfUpperLowerDivider !== null &&
                    indexOfUpperLowerDivider < index
                ) {
                    lowerDividerElementsMap[index] = element;
                } else {
                    upperDividerElementsMap[index] = element;
                }
            }

            if (fieldMap.has(element.name)) {
                const Field = fieldMap.get(element.name);

                bottomFields.push(
                    <Field
                        key={element.id}
                        formId={formId}
                        fieldId={element.id}
                        fieldProps={element.property}
                        handleChange={this.handleChange}
                        value={bottomElementsData[element.id]?.value}
                        handleBulkUpdate={bulkUpdateFormData}
                        formulas={element.property.formula}
                        getElementId={getElementId}
                        autofetch={autofetch}
                        formulaEvaluator={bottomSectionFormulaEvaluator}
                        onLoadQuery={onLoadQuery}
                        onChangeQuery={bottomSectionOnChangeQuery}
                        buttonActionExecutor={buttonActionExecutor}
                        setConditionalOptions={bottomSectionSetConditionalOptions}
                    />
                );
            }
        });

        return (
            <>
                <div className="px-4 pb-2">
                    <BottomSection
                        dividedFields={this.divideElements(
                            upperDividerElementsMap,
                            this.getSlicedFields(bottomFields,0, indexOfUpperLowerDivider)
                        )}
                        nonDividedFields={this.getNonDividedFields(
                            this.getSlicedFields(bottomFields, 0, indexOfUpperLowerDivider),
                            upperIsNonDividedFields,
                            upperLastIndexOfNonDividedFields
                        )}
                    />
                </div>

                <MainSection
                    handleChange={this.props.handleChange}
                    shouldResetMainEntries={this.props.shouldResetMainEntries}
                    setShouldResetMainEntriesFalse={
                        this.props.setShouldResetMainEntriesFalse
                    }
                    setSumOfColumnValues={this.props.setSumOfColumnValues}
                />

                {indexOfUpperLowerDivider !== null && <div className="px-4 pb-2">
                    <BottomSection
                        dividedFields={this.divideElements(
                            lowerDividerElementsMap,
                            bottomFields
                        )}
                        nonDividedFields={this.getNonDividedFields(
                            this.getSlicedFields(bottomFields, Number(indexOfUpperLowerDivider) + 1),
                            lowerIsNonDividedFields,
                            lowerlastIndexOfNonDividedFields - 1
                        )}
                    />
                </div>
                }
                
            </>
        );
    }
}

GridFormWithSectionFields.contextType = GridFormContext;
export default GridFormWithSectionFields;

import React, { Component } from "react";
import { GridFormContext } from "../../../../../context/GridFormContext";
import { fieldMap } from "../../../../../core/fieldMap";

class BottomSection extends Component {
    constructor(props) {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(key, value) {
        this.context.updateFormData(key, value);
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
        bottomElements.forEach((element) => {
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
        return <div className="p-5">{bottomFields}</div>;
    }
}

BottomSection.contextType = GridFormContext;
export default BottomSection;

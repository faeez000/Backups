import { InputNumber } from "antd";
import React from "react";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

export default class TotalField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setValue(this.props.value);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setValue(this.props.value);
        }
    }

    handleValue(value) {
        return value ? `${value}` : "";
    }

    handleChange(value) {
        this.props.handleChange(this.props.fieldId, String(value));
    }

    handleBlur() {
        if (this.props.fieldProps.primary) {
            this.performAutofetch();
        }
        if (!!this.props.formulas && this.props.formulas.length > 0) {
            this.evaluateFormula();
        }
        if (this.props.fieldProps.mandatory) {
            this.handleIsRequiredError();
        }
    }

    getOnloadValueAndSetState(values) {
        this.props.handleBulkUpdate(values);
    }

    render() {
        return (
            <>
                <FieldWrapper>
                    <LableComponent
                        fieldId={this.props.fieldProps.id}
                        isFieldManadatory={this.props.fieldProps.mandatory}
                        fieldName={this.props.fieldProps.name}
                    />
                    <FieldSpinner spinning={this.state.loader}>
                        <InputNumber
                            status={this.state.isError ? "error" : ""}
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            style={{ width: "100%" }}
                            value={this.state.value}
                            onChange={this.handleChange}
                            formatter={(value) =>
                                value === "null" ? 0 : value
                            }
                            readOnly
                        />
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

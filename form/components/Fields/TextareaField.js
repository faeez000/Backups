import { Input } from "antd";
import React from "react";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

const { TextArea } = Input;

export default class TextareaField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setValue(this.props.value);
        if (this.props.fieldProps.onLoadQuery) {
            this.executeOnloadQuery();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setValue(this.props.value);
        }
        if (
            prevState.value !== this.state.value &&
            this.props.fieldProps.onLoadQuery
        ) {
            this.executeOnloadQuery();
        }
    }

    handleValue(value) {
        return !!value ? value : "";
    }

    handleChange(e) {
        /**
         * @developer please don't remove @this setValue line. this line will Solving Caret Jumping issue.
         * please read this artical : https://dev.to/kwirke/solving-caret-jumping-in-react-inputs-36ic
         */

        this.setValue(e.target.value);
        this.props.handleChange(this.props.fieldId, e.target.value);
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
        if (this.props.fieldProps.onChangeQueryElement) {
            this.executeOnChangeQuery();
        }
    }

    getOnloadValueAndSetState(values) {
        this.props.handleBulkUpdate(values);
    }

    render() {
        return (
            <FieldWrapper>
                <LableComponent
                    fieldId={this.props.fieldProps.id}
                    isFieldManadatory={this.props.fieldProps.mandatory}
                    fieldName={this.props.fieldProps.name}
                />
                <FieldSpinner spinning={this.state.loader}>
                    <TextArea
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        rows={1}
                        status={this.state.isError ? "error" : ""}
                        key={this.props.fieldProps.name + this.props.fieldId}
                        allowClear
                        style={{
                            zIndex: 10,
                        }}
                        id={this.props.fieldProps.id}
                        placeholder={this.props.fieldProps.placeholder}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.state.value}
                    />
                </FieldSpinner>
            </FieldWrapper>
        );
    }
}

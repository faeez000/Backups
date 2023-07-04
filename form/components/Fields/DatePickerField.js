import { DatePicker } from "antd";
import React from "react";
import FieldWrapper from "./components/FieldWrapper";
import moment from "moment";
import Field from "./Field";
import { FieldSpinner } from "./components/FieldSpinner";

export default class DatePickerField extends Field {
    constructor(props) {
        super(props, { value: "" });
        this.state = { ...this.state };

        this.dateFormat = "YYYY/MM/DD";
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

        if (prevState.value !== this.state.value) {
            if (this.props.fieldProps.primary) {
                this.performAutofetch();
            }
            if (!!this.props.formulas && this.props.formulas.length > 0) {
                this.evaluateFormula();
            }
        }
    }

    handleValue(value) {
        return !!value ? moment(value, this.dateFormat) : "";
    }

    handleChange(date, dateString) {
        this.props.handleChange(this.props.fieldId, dateString);
    }

    getOnloadValueAndSetState(values) {
        this.props.handleBulkUpdate(values);
    }

    render() {
        return (
            <>
                <FieldWrapper>
                    <label
                        className="text-sm color-[#000000d9] mb-1"
                        htmlFor={this.props.fieldProps.id}
                    >
                        {this.props.fieldProps.name}
                    </label>
                    <FieldSpinner spinning={this.state.loader}>
                        <DatePicker
                            allowClear
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            onChange={this.handleChange}
                            style={{ width: "100%" }}
                            value={this.state.value}
                        />
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

import { Input, AutoComplete } from "antd";
import React from "react";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import countries from "./data/countries.js";
import Field from "./Field";

export default class TelField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state, countryCode: "91" };

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
        return !!value ? this.seprateConutryCodeAndNumber(value) : "";
    }

    handleChange(e) {
        /**
         * @developer please don't remove @this setValue line. this line will Solving Caret Jumping issue.
         * please read this artical : https://dev.to/kwirke/solving-caret-jumping-in-react-inputs-36ic
         */
        if (isNaN(e.target.value)) return;
        this.setValue(e.target.value);
        this.props.handleChange(
            this.props.fieldId,
            this.getNumberWithCountryCode(e.target.value)
        );
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

    seprateConutryCodeAndNumber(value) {
        if (!value) return value;

        const valueArr = value.split("-");
        if (valueArr.length === 1) {
            return valueArr[0];
        }
        this.setState({ countryCode: valueArr[0] });
        return valueArr[1];
    }

    handleCountryChange = (value) => {
        if (isNaN(value)) return;

        this.setCountryCode(value);

        this.props.handleChange(
            this.props.fieldId,
            value + "-" + this.state.value
        );
    };

    setCountryCode(value) {
        this.setState({ countryCode: value });
    }

    getNumberWithCountryCode(number) {
        return this.state.countryCode + "-" + number;
    }

    getUniuqeCountryCode() {
        const countryCodeSet = new Set();
        countries.forEach((country) => countryCodeSet.add(country.code));
        return [...countryCodeSet];
    }

    render() {
        const countrieCodeOptions = this.getUniuqeCountryCode().map(
            (countryCode) => ({
                value: countryCode,
            })
        );

        return (
            <>
                <FieldWrapper>
                    <LableComponent
                        fieldId={this.props.fieldProps.id}
                        isFieldManadatory={this.props.fieldProps.mandatory}
                        fieldName={this.props.fieldProps.name}
                    />

                    <FieldSpinner spinning={this.state.loader}></FieldSpinner>
                    <Input.Group compact>
                        <AutoComplete
                            placeholder="country code"
                            options={countrieCodeOptions}
                            value={this.state.countryCode}
                            onChange={this.handleCountryChange}
                            style={{ width: "20%" }}
                        />
                        <Input
                            status={this.state.isError ? "error" : ""}
                            allowClear
                            maxLength={14}
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            type={"tel"}
                            style={{ width: "80%" }}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            value={this.state.value}
                            onKeyDown={this.handleEnterPressOnInput}
                        />
                    </Input.Group>
                </FieldWrapper>
            </>
        );
    }
}

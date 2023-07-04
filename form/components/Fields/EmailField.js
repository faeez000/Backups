import { Input } from "antd";
import React from "react";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

export default class EmailField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state, isValidEmail: true };

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

    isValidEmailFormat(email) {
        if (!email) return true;
        let regExp =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(email);
    }

    handleChange(e) {
        /**
         * @developer please don't remove @this setValue line. this line will Solving Caret Jumping issue.
         * please read this artical : https://dev.to/kwirke/solving-caret-jumping-in-react-inputs-36ic
         */

        this.setValue(e.target.value);

        this.props.handleChange(this.props.fieldId, e.target.value);

        if (this.isValidEmailFormat(e.target.value)) {
            this.setState({ isValidEmail: true });
        } else {
            this.setState({ isValidEmail: false });
        }
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
            <>
                <FieldWrapper>
                    <LableComponent
                        fieldId={this.props.fieldProps.id}
                        isFieldManadatory={this.props.fieldProps.mandatory}
                        fieldName={this.props.fieldProps.name}
                    />
                    <FieldSpinner spinning={this.state.loader}>
                        <Input
                            status={
                                (!this.state.isValidEmail && "warning") ||
                                (this.state.isError && "error")
                            }
                            allowClear
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            onBlur={this.handleBlur}
                            onChange={this.handleChange}
                            type={"email"}
                            style={{ width: "100%" }}
                            placeholder={this.props.fieldProps.placeholder}
                            value={this.state.value}
                            onKeyDown={this.handleEnterPressOnInput}
                        />
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

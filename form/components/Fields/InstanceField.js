import { Input, InputNumber } from "antd";
import React from "react";
import FieldWrapper from "./components/FieldWrapper";
import Field from "./Field";
import { FieldSpinner } from "./components/FieldSpinner";
import LableComponent from "./components/LableComponent";
import { elementAPIService } from "../../services";

export default class InstanceField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state };

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this.setValue(this.props.value);

        if (
            this.props.fieldProps.instanceType === "automatic" &&
            this.isNewForm()
        ) {
            this.setInstanceValue();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setValue(this.props.value);
        }
        if (
            !this.state.value &&
            this.props.fieldProps.instanceType === "automatic" &&
            this.isNewForm()
        ) {
            this.setInstanceValue();
        }
    }

    handleValue(value) {
        return value ? `${value}` : "";
    }

    handleChange(value) {
        if (value && typeof value === "object") {
            value = value.target.value;
        }

        /**
         * @developer please don't remove @this setValue line. this line is Solving Caret Jumping issue.
         * please read this artical : https://dev.to/kwirke/solving-caret-jumping-in-react-inputs-36ic
         */
        this.setValue(value);

        this.props.handleChange(this.props.fieldId, String(value));
    }

    handleBlur() {
        this.handleIsRequiredError();
    }

    getOnloadValueAndSetState(values) {
        this.props.handleBulkUpdate(values);
    }

    async setInstanceValue() {
        const instanceValue = await this.getInstanceValue(
            this.props.formId,
            this.props.fieldId
        );
        if (instanceValue) {
            this.props.handleChange(this.props.fieldId, String(instanceValue));
        }
    }

    async getInstanceValue(formId, elementId) {
        const { success, instanceValue } =
            await elementAPIService.getInstanceValue(formId, elementId);
        return success ? instanceValue : "";
    }

    isNewForm() {
        const paramsPathName = window.location.pathname;
        if (
            paramsPathName.substring(paramsPathName.lastIndexOf("/") + 1) ===
            "new"
        ) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <>
                <FieldWrapper>
                    <LableComponent
                        fieldId={this.props.fieldProps.id}
                        isFieldManadatory={true}
                        fieldName={this.props.fieldProps.name}
                    />
                    <FieldSpinner spinning={this.state.loader}>
                        {this.isNewForm() ? (
                            <Input.Group compact>
                                <Input
                                    style={{
                                        width: "24%",
                                        textAlign: "center",
                                    }}
                                    placeholder="prefix value"
                                    value={this.props.fieldProps.prefix}
                                />
                                <InputNumber
                                    status={this.state.isError ? "error" : ""}
                                    key={
                                        this.props.fieldProps.name +
                                        this.props.fieldId
                                    }
                                    id={this.props.fieldProps.id}
                                    placeholder={
                                        this.props.fieldProps.placeholder
                                    }
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    value={this.state.value}
                                    formatter={(value) =>
                                        value === "null" ? 0 : value
                                    }
                                    style={{
                                        width: "52%",
                                        textAlign: "end",
                                    }}
                                    onKeyDown={this.handleEnterPressOnInput}
                                />
                                <Input
                                    style={{
                                        width: "24%",
                                        textAlign: "center",
                                    }}
                                    placeholder="suffix value"
                                    value={this.props.fieldProps.suffix}
                                />
                            </Input.Group>
                        ) : (
                            <Input
                                key={
                                    this.props.fieldProps.name +
                                    this.props.fieldId
                                }
                                status={this.state.isError ? "error" : ""}
                                id={this.props.fieldProps.id}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={this.state.value}
                            />
                        )}
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

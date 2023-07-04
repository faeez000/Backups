import { Radio, Space } from "antd";
import React from "react";
import { elementAPIService } from "../../services";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

export default class RadioField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state, options: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this.setValue(this.props.value);

        if (this.props.fieldProps.onLoadQuery) {
            this.executeOnloadQuery();
        } else {
            const { success, options } =
                await elementAPIService.getElementsOptions(
                    this.props.formId,
                    this.props.fieldId,
                    this.props.fieldProps.optionType
                );

            if (success) {
                this.setState({
                    options: options[0]?.value,
                    loaded: true,
                });
            }
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
        return !!value ? value : "";
    }

    handleChange(e) {
        this.props.handleChange(this.props.fieldId, e.target.value);
    }

    getUniuqeOptions(options) {
        return [...new Set(options)];
    }

    getOptionsArray(commaSepratedString) {
        return commaSepratedString.split(",");
    }

    getOptionsComponent() {
        return (
            this.state.options &&
            this.getUniuqeOptions(this.getOptionsArray(this.state.options)).map(
                (option) => {
                    option = option.trim();

                    return (
                        <Radio key={option} value={option}>
                            {option}
                        </Radio>
                    );
                }
            )
        );
    }

    getOnloadValueAndSetState(values) {
        this.setState({
            options: !!values[0]?.value ? values[0].value : "",
            loaded: true,
        });
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
                        <Radio.Group
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            onChange={this.handleChange}
                            value={this.state.value}
                        >
                            <Space
                                direction="vertical"
                                className="flex flex-row flex-wrap"
                            >
                                {this.getOptionsComponent()}
                            </Space>
                        </Radio.Group>
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

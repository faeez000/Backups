import { Checkbox, Row, Col } from "antd";
import React from "react";
import { elementAPIService } from "../../services";
import FieldWrapper from "./components/FieldWrapper";
import Field from "./Field";
import { FieldSpinner } from "./components/FieldSpinner";
import LableComponent from "./components/LableComponent";

export default class CheckboxField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state, options: "", loaded: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);
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
        return !!value ? value.split(",") : [];
    }

    handleChange(checkedValues) {
        this.props.handleChange(this.props.fieldId, checkedValues.join(","));
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
                {this.state.loaded && (
                    <FieldWrapper>
                        <LableComponent
                            fieldId={this.props.fieldProps.id}
                            isFieldManadatory={this.props.fieldProps.mandatory}
                            fieldName={this.props.fieldProps.name}
                        />
                        <FieldSpinner spinning={this.state.loader}>
                            <Checkbox.Group
                                key={
                                    this.props.fieldProps.name +
                                    this.props.fieldId
                                }
                                style={{ width: "100%" }}
                                onChange={this.handleChange}
                                value={this.state.value}
                            >
                                <Row>
                                    {this.state.options &&
                                        this.state.options
                                            .split(",")
                                            .map((option, index) => {
                                                option = option.trim();
                                                return (
                                                    <Col key={index} span={8}>
                                                        <Checkbox
                                                            value={option}
                                                        >
                                                            {option}
                                                        </Checkbox>
                                                    </Col>
                                                );
                                            })}
                                </Row>
                            </Checkbox.Group>
                        </FieldSpinner>
                    </FieldWrapper>
                )}
            </>
        );
    }
}

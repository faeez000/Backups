import { Select } from "antd";
import React from "react";
import { elementAPIService } from "../../services";
import MasterModal from "../Forms/MasterModalForm/MasterModal";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

const { Option } = Select;

export default class SelectField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state, options: "" };

        this.handleChange = this.handleChange.bind(this);
        this.fetchOptionsAndSetState = this.fetchOptionsAndSetState.bind(this);
    }

    async componentDidMount() {
        this.setValue(this.props.value);
        if (this.props.fieldProps.onLoadQuery) {
            this.executeOnloadQuery();
        } else this.fetchOptionsAndSetState();
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
            if (this.props.fieldProps.onChangeQueryElement) {
                this.executeOnChangeQuery();
            }
        }
    }

    handleValue(value) {
        return !!value ? value : "";
    }

    handleChange(value) {
        this.props.handleChange(this.props.fieldId, value);
    }

    getOptionsToRender() {
        return Array.from(new Set(this.state.options.split(","))).map(
            (option, index) => {
                option = option.trim();
                return (
                    <Option key={index} value={option}>
                        {option}
                    </Option>
                );
            }
        );
    }

    async fetchOptionsAndSetState() {
        if(this.props.fieldProps.optionType === "conditional")return;
        const { success, options } = await elementAPIService.getElementsOptions(
            this.props.formId,
            this.props.fieldId,
            this.props.fieldProps.optionType
        );

        if (success) {
            this.setState({
                options: !!options[0]?.value ? options[0].value : "",
                loaded: true,
            });
        }
    }

    getOnloadValueAndSetState(values) {
        this.setState({
            options: !!values[0]?.value ? values[0].value : "",
            loaded: true,
        });
    }

    handleFocus = () => {
        if(this.props.fieldProps.optionType === "conditional" && this.props.fieldProps.conditionalElements){
            this.executeOptionsFetching()
        }  
    }

    setOptions=(options)=>{
        this.setState({
            options: options,
            loader: false,
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
                        <div className="flex">
                            <Select
                                allowClear
                                key={
                                    this.props.fieldProps.name +
                                    this.props.fieldId
                                }
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children
                                        .toLowerCase()
                                        .localeCompare(
                                            optionB.children.toLowerCase()
                                        )
                                }
                                onFocus={this.handleFocus}
                                onSelect={this.handleChange}
                                value={this.state.value}
                                loading={this.state.loader}
                            >
                                {this.getOptionsToRender()}
                            </Select>
                            {this.props.fieldProps.masterForm &&
                                this.props.fieldProps.masterForm !== "none" && (
                                    <MasterModal
                                        formId={
                                            this.props.fieldProps.masterForm
                                        }
                                        fetchOptionsAndSetState={
                                            this.fetchOptionsAndSetState
                                        }
                                    />
                                )}
                        </div>
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

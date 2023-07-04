import { Button } from "antd";
import React from "react";
import ButtonActionExecutor from "../../core/ButtonActionExecutor";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

export default class ButtonField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.handleChange = this.handleChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {}

    handleValue(value) {
        return !!value ? value : "";
    }

    handleChange(e) {
        this.props.handleChange(this.props.fieldId, e.target.value);
    }

    handleBlur() {}

    handleOnClick() {
        if (!this.props.fieldProps.actionType) return;
        this.props.buttonActionExecutor.exectuteAction(this.props.fieldProps);
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
                    <div className="d-flex flex-row">
                        <button
                            onClick={this.handleOnClick}
                            type="button"
                            className="inline-block px-6 py-2.5 bg-violet-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-600 hover:shadow-lg focus:bg-violet-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-700 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            {this.props.fieldProps.name}
                        </button>
                    </div>
                </FieldWrapper>
            </>
        );
    }
}

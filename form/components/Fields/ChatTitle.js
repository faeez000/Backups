import React from "react";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import Field from "./Field";

export default class ChatTitle extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state };
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

    getOnloadValueAndSetState(values) {
        this.props.handleBulkUpdate(values);
    }

    handleChange(e) {
        /**
         * @developer please don't remove @this setValue line. this line is Solving Caret Jumping issue.
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

    isLableRequired() {
        return true;
    }

    render() {
        return (
            <>
                <FieldWrapper>
                    <div className="flex flex-row">
                        {this.isLableRequired() && (
                            <h3
                                className="color-[#000000d9] mb-1 font-medium leading-tight text-xl mt-0"
                                htmlFor={this.props.fieldProps.id}
                            >
                                {/* {this.props.fieldProps.name}: */}
                                ChatTitle:
                            </h3>
                        )}

                        <label
                            className={`flex ${
                                this.isLableRequired() ? "ml-3" : ""
                            }`}
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            style={{ width: "100%" }}
                        >
                            <b className="color-[#000000d9] mb-1 font-medium leading-tight text-xl mt-0">
                                {this.props.fieldProps.name}
                            </b>
                        </label>
                    </div>
                </FieldWrapper>
            </>
        );
    }
}

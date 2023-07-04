import React from "react";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import Field from "./Field";

export default class LabelField extends Field {
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

    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    isLableRequired() {
        return this.props.fieldProps.labelRequired;
    }

    render() {
        const LinkElement = (
            <span
                className="text-blue-500 cursor-pointer break-words hover:underline"
                onClick={() => window.open(this.state.value)}
            >
                {this.state.value}
            </span>
        );

        return (
            <>
                <FieldWrapper>
                    <div className="d-flex flex-row">
                        {this.isLableRequired() && (
                            <label
                                className="text-sm color-[#000000d9] mb-1"
                                htmlFor={this.props.fieldProps.id}
                            >
                                {this.props.fieldProps.name}:
                            </label>
                        )}

                        <label
                            className={this.isLableRequired() ? "ml-3" : ""}
                            key={
                                this.props.fieldProps.name + this.props.fieldId
                            }
                            style={{ width: "100%" }}
                        >
                            {this.isValidHttpUrl(this.state.value) ? (
                                LinkElement
                            ) : (
                                <b>{this.state.value}</b>
                            )}
                        </label>
                    </div>
                </FieldWrapper>
            </>
        );
    }
}

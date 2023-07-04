import { Input, Divider } from "antd";
import React from "react";
import FieldWrapper from "./components/FieldWrapper";
import Field from "./Field";
import { FieldSpinner } from "./components/FieldSpinner";
import LableComponent from "./components/LableComponent";

export default class ElementDividerField extends Field {
    constructor(props) {
        super(props, { value: "" });
    }

    componentDidMount() {
        this.setValue(this.props.value);
    }

    render() {
        return (
            <>
                <FieldWrapper>
                    <Divider />
                </FieldWrapper>
            </>
        );
    }
}

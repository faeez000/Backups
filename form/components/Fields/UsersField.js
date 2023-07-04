import { Select } from "antd";
import React from "react";
import { elementAPIService } from "../../services";
import { FieldSpinner } from "./components/FieldSpinner";
import FieldWrapper from "./components/FieldWrapper";
import LableComponent from "./components/LableComponent";
import Field from "./Field";

const { Option } = Select;

export default class UsersField extends Field {
    constructor(props) {
        super(props, { value: "" });

        this.state = { ...this.state, options: [] };

        this.handleChange = this.handleChange.bind(this);
        this.fetchUserListAndSetState =
            this.fetchUserListAndSetState.bind(this);
    }

    async componentDidMount() {
        this.setValue(this.props.value);
        this.fetchUserListAndSetState();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setValue(this.props.value);
        }
    }

    handleValue(value) {
        return !!value ? value : "";
    }

    handleChange(value) {
        this.props.handleChange(this.props.fieldId, value);
    }

    getOptionsToRender() {
        return Array.from(new Set(this.state.options)).map((item) => {
            return (
                <Option key={item.user_id} value={item.user_id}>
                    {item.username}
                </Option>
            );
        });
    }

    async fetchUserListAndSetState() {
        const { success, userList } = await elementAPIService.getUserListForSWC(
            this.props.formId
        );

        if (success) {
            this.setState({
                options: userList,
                loaded: true,
            });
        }
    }

    // getOnloadValueAndSetState(values) {
    //     this.setState({
    //         options: !!values[0]?.value ? values[0].value : "",
    //         loaded: true,
    //     });
    // }

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
                                onSelect={this.handleChange}
                                value={this.state.value}
                            >
                                {this.getOptionsToRender()}
                            </Select>
                        </div>
                    </FieldSpinner>
                </FieldWrapper>
            </>
        );
    }
}

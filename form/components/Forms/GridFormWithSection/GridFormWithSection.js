import React from "react";
import { Button, notification, message } from "antd";
import { GridFormContext } from "../../../context/GridFormContext";
import GridFormWithSectionFields from "./components/GridFormWithSectionFields";
import { checkIsAllMandatoryFieldsFilled } from "../../modules/checkIsAllMandatoryFieldsFilled";

class GridFormWithSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissionLoader: false,
            shouldResetMainEntries: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openNotificationWithIcon =
            this.openNotificationWithIcon.bind(this);
    }

    componentDidUpdate() {}

    handleChange(key, value) {
        this.context.updateFormData(key, value);
    }

    handleReset = () => {
        this.context.resetFormData();
    };

    openNotificationWithIcon(type, message, description = "") {
        notification[type]({
            message,
            description,
            placement: "topRight",
        });
    }

    isNewRecordForm() {
        return this.props.recordId ? false : true;
    }

    setShouldResetMainEntriesFalse = () => {
        this.setState({ shouldResetMainEntries: false });
    };

    async handleSubmit(e) {
        e.preventDefault();

        const isFieldsAreFilled = checkIsAllMandatoryFieldsFilled(
            this.context.bottomElements,
            this.context.bottomElementsData
        );

        if (!isFieldsAreFilled)
            // return this.openNotificationWithIcon(
            //     "error",
            //     "Mandatory fields cannot be empty"
            // );
            return message.error("Mandatory fields cannot be empty");

        this.setState({ submissionLoader: true });

        const { success, messages } = await this.context.submitForm();

        this.setState({
            submissionLoader: false,
        });

        if (!success) {
            // this.openNotificationWithIcon("warning", message);
            message.warning(messages);
            return;
        }
        if (this.isNewRecordForm()) {
            this.setState({ shouldResetMainEntries: true });
            this.context.resetFormData();
        }
        // this.openNotificationWithIcon("success", message);
        message.success(messages);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="my-2 overflow-y-auto ">
                    <GridFormWithSectionFields
                        handleChange={this.handleChange}
                        shouldResetMainEntries={
                            this.state.shouldResetMainEntries
                        }
                        setShouldResetMainEntriesFalse={
                            this.setShouldResetMainEntriesFalse
                        }
                        setSumOfColumnValues={this.setSumOfColumnValues}
                    />
                </div>
                <div className="bg-white border-t bottom-[-20px] sticky w-full z-20 p-4 pb-6">
                    <Button
                        htmlType="submit"
                        loading={this.state.submissionLoader}
                        type="primary"
                    >
                        Submit
                    </Button>
                    <Button
                        type="secondary"
                        style={{ alignItems: "center" }}
                        className="ml-2"
                        onClick={this.handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </form>
        );
    }
}

GridFormWithSection.contextType = GridFormContext;

export default GridFormWithSection;

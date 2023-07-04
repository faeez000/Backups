import React from "react";
import { Button, notification, message } from "antd";
import { GridFormContext } from "../../../context/GridFormContext";
import MainSection from "./components/MainSection/MainSection";
import BottomSection from "./components/BottomSection/BottomSection";
import { checkIsAllMandatoryFieldsFilled } from "../../modules/checkIsAllMandatoryFieldsFilled";

class GridForm extends React.Component {
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
                <div className="grid grid-rows md:grid-cols-3 gap-6">
                    <MainSection
                        handleChange={this.handleChange}
                        shouldResetMainEntries={
                            this.state.shouldResetMainEntries
                        }
                        setShouldResetMainEntriesFalse={
                            this.setShouldResetMainEntriesFalse
                        }
                        setSumOfColumnValues={this.setSumOfColumnValues}
                    />
                    <div className="border my-14 relative max-h-[70vh]  overflow-y-auto ">
                        <BottomSection />
                        <div className="bg-white border-t z-20 sticky bottom-0 p-4">
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
                    </div>
                </div>
            </form>
        );
    }
}

GridForm.contextType = GridFormContext;

export default GridForm;

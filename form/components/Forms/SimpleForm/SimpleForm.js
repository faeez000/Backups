import React from "react";
import { fieldMap } from "../../../core/fieldMap";
import { Button, notification, message } from "antd";
import { SimplelFormContext } from "../../../context/SimpleFormContext";
import { checkIsAllMandatoryFieldsFilled } from "../../modules/checkIsAllMandatoryFieldsFilled";

class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submissionLoader: false,
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

    handleReset() {
        this.context.resetFormData();
    }

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

    async handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        const isFieldsAreFilled = checkIsAllMandatoryFieldsFilled(
            this.context.elements,
            this.context.formData
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
            message.warning(messages, 20);
            return;
        }
        if (this.isNewRecordForm()) {
            this.context.resetFormData();
        }

        // this.openNotificationWithIcon("success", message);
        message.success(messages);
    }

    render() {
        const {
            elements,
            formData,
            formId,
            bulkUpdateFormData,
            getElementId,
            autofetch,
            formulaEvaluator,
            onLoadQuery,
            onChangeQuery,
            buttonActionExecutor,
            setConditionalOptions
        } = this.context;

        const fields = [];
        elements.forEach((element) => {
            if (fieldMap.has(element.name)) {
                const Field = fieldMap.get(element.name);
                fields.push(
                    <Field
                        key={element.id}
                        formId={formId}
                        fieldId={element.id}
                        fieldProps={element.property}
                        handleChange={this.handleChange}
                        handleBulkUpdate={bulkUpdateFormData}
                        value={formData[element.id]?.value}
                        formulas={element.property.formula}
                        getElementId={getElementId}
                        autofetch={autofetch}
                        formulaEvaluator={formulaEvaluator}
                        onLoadQuery={onLoadQuery}
                        onChangeQuery={onChangeQuery}
                        buttonActionExecutor={buttonActionExecutor}
                        setConditionalOptions={setConditionalOptions}
                    />
                );
            }
        });

        return (
            <div className="w-full p-4 lg:p-2 md:p-2 ">
                <form onSubmit={this.handleSubmit}>
                    {fields}
                    <div className="mt-9 flex justify-start items-center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.submissionLoader}
                            style={{ alignItems: "center" }}
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
            </div>
        );
    }
}

SimpleForm.contextType = SimplelFormContext;

export default SimpleForm;

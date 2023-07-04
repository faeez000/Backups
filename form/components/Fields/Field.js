import React from "react";

export default class Field extends React.Component {
    constructor(props, { value }) {
        super(props);
        this.state = {
            value: this.handleValue(value),
            loader: false,
            isError: false,
        };

        this.autofetchEvent = undefined;

        this.setValue = this.setValue.bind(this);
        this.setLoader = this.setLoader.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getOnloadValueAndSetState =
            this.getOnloadValueAndSetState.bind(this);
        this.handleIsRequiredError = this.handleIsRequiredError.bind(this);
    }

    /**
     * @abstract
     * @param {*} value
     */
    setValue(value) {
        this.setState({ value: this.handleValue(value) });
    }

    /**
     * @abstract
     * @param {boolean} value
     */
    setLoader(value) {
        this.setState({ loader: value });
    }

    /**
     * @abstract
     * @param {*} value
     */
    handleValue(value) {}

    /**
     * @abstract
     */
    handleBlur() {}

    /**
     * @abstract
     */
    getOnloadValueAndSetState() {}

    performAutofetch() {
        this.props.autofetch.perform({
            formId: this.props.formId,
            elementId: this.props.fieldId,
            value: this.state.value,
            handleBulkUpdate: this.props.handleBulkUpdate,
            setLoader: this.setLoader,
        });
    }

    evaluateFormula() {
        this.props.formulaEvaluator.evaluate({
            formulas: !!this.props.formulas ? this.props.formulas : [],
            getElementId: this.props.getElementId,
            handleBulkUpdate: this.props.handleBulkUpdate,
        });
    }

    async executeOnloadQuery() {
        const values = await this.props.onLoadQuery.execute({
            formId: this.props.formId,
            elementId: this.props.fieldId,
        });
        this.getOnloadValueAndSetState(values);
    }

    executeOnChangeQuery() {
        this.props.onChangeQuery.execute({
            formId: this.props.formId,
            getElementId: this.props.getElementId,
            handleBulkUpdate: this.props.handleBulkUpdate,
            onChangeQueryElement: this.props.fieldProps.onChangeQueryElement,
            setLoader: this.setLoader,
        });
    }

    executeOptionsFetching() {
        this.props.setConditionalOptions.executeOptionsFetching({
            formId: this.props.formId,
            elementId: this.props.fieldId,
            getElementId: this.props.getElementId,
            conditionalElements:this.props.fieldProps.conditionalElements,
            setOptions: this.setOptions,
            setLoader: this.setLoader,
        });
    }

    handleIsRequiredError() {
        if (this.state.value) {
            this.setState({ isError: false });
        } else {
            this.setState({ isError: true });
        }
    }

    handleEnterPressOnInput = (event) => {
        var key = event.charCode || event.keyCode || 0;
        if (key === 13) {
            event.preventDefault();
        }
    };
}

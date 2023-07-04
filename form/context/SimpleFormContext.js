import { createContext, useContext } from "react";
import { shallowEqual } from "shallow-equal-object";
import { handleInstanceElementValue } from "../components/modules/handleInstanceElementValue";
import Formula from "../core/Formula";
import { elementAPIService, formAPIService } from "../services";
import { FormProvider } from "./FormContext";

export const SimplelFormContext = createContext();

export function useSimpleForm() {
    return useContext(SimplelFormContext);
}

export class SimpleFormProvider extends FormProvider {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            formData: {},
        };

        this.elements = [];
    }

    componentDidUpdate(prevProps, prevState) {
        if (!shallowEqual(prevState.formData, this.state.formData)) {
            this.props.formulaEvaluator.setupData(this.state.formData);
            this.props.onChangeQuery.setupData(this.state.formData);
            this.props.setConditionalOptions.setupData(this.state.formData);
        }
    }

    async fetchElements() {
        let section;
        if (this.formDetails.form_type === "SimpleWithChat") {
            section = "Chat_Details";
        }
        const { elements } =
            await elementAPIService.getElementsByFormIdAndSection(
                this.props.formId,
                section
            );

        this.elements = elements;

        this.setState({ loaded: true });
        return;
    }
    /**
     *
     * @param {object} data
     */
    setFormData(data) {
        const formData = {};

        this.createReferenceFormulasMap(this.elements);
        this.createOnChangeQueryReferenceList(this.elements);
        this.props.onChangeQuery.setElements(this.elements);

        this.elements.forEach((element) => {
            const value = !!data[element.property.name]
                ? data[element.property.name]
                : null;
            element.property.onChangeQueryElement =
                this.referenceOnChangeQueryMap[element.property.referenceId];
            element.property.formula =
                this.referenceFormulasMap[element.property.referenceId];

            formData[element.id] = {
                elementId: element.id,
                elementName: element.property.name,
                elementType: element.name,
                value,
            };
        });

        this.initialFormData = formData;

        this.setState({ formData });
    }

    /**
     *
     * @param {object} data
     */
    setupForm(data) {
        const formData = {};

        this.createReferenceFormulasMap(this.elements);

        this.elements.forEach((element) => {
            const value = !!data[element.property.name]
                ? data[element.property.name]
                : null;

            element.property.formula =
                this.referenceFormulasMap[element.property.referenceId];

            formData[element.id] = {
                elementId: element.id,
                elementName: element.property.name,
                elementType: element.name,
                value,
            };
        });

        this.initialFormData = formData;

        this.setState({ formData });
    }

    /**
     *
     * @param {string} key
     * @param {string} value
     */
    updateFormData(key, value) {
        key = this.getElementId(key);

        if (this.state.formData.hasOwnProperty(key)) {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [key]: {
                        ...this.state.formData[key],
                        value: !!value ? value : null,
                    },
                },
            });
        }
    }

    bulkUpdateFormData(items = []) {
        this.setState((prevState) => {
            const formData = {};

            for (const item of items) {
                const key = this.getElementId(item.key);
                formData[key] = {
                    ...prevState.formData[key],
                    value: !!item.value ? item.value : null,
                };
            }
            return {
                formData: {
                    ...this.state.formData,
                    ...formData,
                },
            };
        });
    }

    resetFormData() {
        this.setState({ formData: this.initialFormData });
    }

    async submitForm() {
        const cloneFormData = { ...this.state.formData };
        handleInstanceElementValue(this.elements, cloneFormData);

        const body = {
            formId: this.props.formId,
            recordId: this.recordId,
            data: Object.values(cloneFormData),
        };

        return await formAPIService.saveForm(body);
    }

    render() {
        const value = {
            formDetails: this.formDetails,
            formId: this.props.formId,
            elements: this.elements,
            formData: this.state.formData,
            setFormData: this.setFormData,
            setupForm: this.setupForm,
            updateFormData: this.updateFormData,
            bulkUpdateFormData: this.bulkUpdateFormData,
            resetFormData: this.resetFormData,
            submitForm: this.submitForm,
            setRecordId: this.setRecordId,
            getElementId: this.getElementId,
            autofetch: this.props.autofetch,
            formulaEvaluator: this.props.formulaEvaluator,
            onLoadQuery: this.props.onLoadQuery,
            onChangeQuery: this.props.onChangeQuery,
            buttonActionExecutor: this.props.buttonActionExecutor,
            setConditionalOptions: this.props.setConditionalOptions,
        };
        return (
            <SimplelFormContext.Provider value={value}>
                {this.state.loaded && this.props.children}
            </SimplelFormContext.Provider>
        );
    }
}

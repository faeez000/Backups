import { createContext, useContext } from "react";
import { shallowEqual } from "shallow-equal-object";
import { handleInstanceElementValue } from "../components/modules/handleInstanceElementValue";
import { elementAPIService, formAPIService } from "../services";
import { FormProvider } from "./FormContext";

const [MAIN_SECTION, BOTTOM_SECTION] = ["Main_Element", "Bottom_Element"];

export const GridFormContext = createContext();

export function useGridForm() {
    return useContext(GridFormContext);
}

export class GridFormProvider extends FormProvider {
    constructor(props) {
        super(props);
        this.state = {
            formData: { mainElements: {}, bottomElements: {} },
            mainElements: {},
            bottomElements: {},
        };

        this.mainElements = [];
        this.bottomElements = [];
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            !shallowEqual(prevState.bottomElements, this.state.bottomElements)
        ) {
            this.props.bottomSectionFormulaEvaluator.setupData(
                this.state.bottomElements
            );
            // this.props.onChangeQuery.setupData({
            //     bottomElements: this.state.bottomElements,
            //     mainElements: this.state.mainElements,
            // });
            if (this.props.bottomSectionOnChangeQuery) {
                this.props.bottomSectionOnChangeQuery.setupData(
                    this.state.bottomElements
                );
            }
            this.props.bottomSectionSetConditionalOptions.setupData(this.state.bottomElements)
        }
    }

    async fetchElements() {
        const { success, elements } =
            await elementAPIService.getElementsByFormId(this.props.formId);

        if (!success) {
            console.log("can't fetch element in grid from context");
            return;
        }

        for (let element of elements) {
            if (element.property.section === MAIN_SECTION) {
                this.mainElements.push(element);
            } else {
                this.bottomElements.push(element);
            }
        }
    }

    /**
     *
     * @param {object} data
     */
    setFormData(data) {
        const formData = { mainElements: {}, bottomElements: {} };
        const bottomData = data.bottomElements[0];

        this.createReferenceFormulasMap(this.bottomElements);
        this.createReferenceFormulasMap(this.mainElements);

        this.createOnChangeQueryReferenceList(this.bottomElements);
        this.createOnChangeQueryReferenceList(this.mainElements);

        this.props.bottomSectionOnChangeQuery.setElements(this.bottomElements);
        this.props.mainSectionOnChangeQuery.setElements(this.mainElements);

        this.mainElements.forEach((element) => {
            const value = !!data[element.property.name]
                ? data[element.property.name]
                : null;
            element.property.onChangeQueryElement =
                this.referenceOnChangeQueryMap[element.property.referenceId];
            element.property.formula =
                this.referenceFormulasMap[element.property.referenceId];

            formData.mainElements[element.id] = {
                elementId: element.id,
                elementName: element.property.name,
                elementType: element.name,
                value,
            };
        });

        this.bottomElements.forEach((element) => {
            const value = !!bottomData[element.property.name]
                ? bottomData[element.property.name]
                : null;

            element.property.onChangeQueryElement =
                this.referenceOnChangeQueryMap[element.property.referenceId];
            element.property.formula =
                this.referenceFormulasMap[element.property.referenceId];

            formData.bottomElements[element.id] = {
                elementId: element.id,
                elementName: element.property.name,
                elementType: element.name,
                value,
            };
        });

        this.setState({
            formData: formData,
            mainElements: formData.mainElements,
            bottomElements: formData.bottomElements,
        });
        this.initialFormData = {
            mainElements: formData.mainElements,
            bottomElements: formData.bottomElements,
        };
    }

    /**
     *
     * @param {string} key
     * @param {string} value
     */

    updateFormData(key, value) {
        if (this.state.bottomElements.hasOwnProperty(key)) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    bottomElements: {
                        ...prevState.bottomElements,
                        [key]: {
                            ...prevState.bottomElements[key],
                            value: !!value ? value : null,
                        },
                    },
                };
            });
        }
    }

    resetFormData() {
        this.setState({
            bottomElements: this.initialFormData.bottomElements,
            mainElements: this.initialFormData.mainElements,
        });
    }

    getMainElementsDto(recordData, elementsData) {
        let elementsDataMap = new Map();
        elementsData.forEach((element) =>
            elementsDataMap.set(element.elementName, element)
        );
        let mainElementsDto = recordData.map((record) => {
            let recordWithElement = [];
            for (let item in record) {
                recordWithElement.push({
                    ...elementsDataMap.get(item),
                    value: record[item] || null,
                });
            }
            return recordWithElement;
        });
        return mainElementsDto;
    }

    bulkUpdateFormData(items = []) {
        this.setState((prevState) => {
            const bottomElements = {};

            for (const item of items) {
                const key = this.getElementId(item.key);

                bottomElements[key] = {
                    ...prevState.bottomElements[key],
                    value: !!item.value ? item.value : null,
                };
            }
            return {
                bottomElements: {
                    ...this.state.bottomElements,
                    ...bottomElements,
                },
            };
        });
    }

    setMainElementsData = (data) => {
        let elementsData = Object.values(this.state.formData.mainElements);
        let recordData = Array.from(data.values());
        this.setState({
            mainElements: this.getMainElementsDto(recordData, elementsData),
        });
    };

    async submitForm() {
        const checkAndGetMainElements = (mainElementDTO) => {
            if (Array.isArray(mainElementDTO)) return mainElementDTO;
            // return [Object.values(this.state.mainElements)];
            return [[]];
        };

        const cloneBottomFormData = { ...this.state.bottomElements };
        handleInstanceElementValue(this.bottomElements, cloneBottomFormData);
        const body = {
            formId: this.props.formId,
            recordId: this.recordId,
            bottomElement: Object.values(cloneBottomFormData),
            mainElement: checkAndGetMainElements(this.state.mainElements),
        };

        return await formAPIService.saveGridForm(body);
    }
    
    render() {
        const value = {
            formDetails: this.formDetails,
            formId: this.props.formId,
            mainElements: this.mainElements,
            bottomElements: this.bottomElements,
            formData: this.state.formData,
            setFormData: this.setFormData,
            updateFormData: this.updateFormData,
            resetFormData: this.resetFormData,
            submitForm: this.submitForm,
            setRecordId: this.setRecordId,
            recordId: this.recordId,
            mainElementsData: this.state.mainElements,
            bottomElementsData: this.state.bottomElements,
            setMainElementsData: this.setMainElementsData,
            bulkUpdateFormData: this.bulkUpdateFormData,
            getElementId: this.getElementId,
            autofetch: this.props.autofetch,
            mainSectionFormulaEvaluator: this.props.mainSectionFormulaEvaluator,
            bottomSectionFormulaEvaluator:
                this.props.bottomSectionFormulaEvaluator,
            onLoadQuery: this.props.onLoadQuery,
            bottomSectionOnChangeQuery: this.props.bottomSectionOnChangeQuery,
            mainSectionOnChangeQuery: this.props.mainSectionOnChangeQuery,
            buttonActionExecutor: this.props.buttonActionExecutor,
            bottomSectionSetConditionalOptions: this.props.bottomSectionSetConditionalOptions,
            mainSectionSetConditionalOptions : this.props.mainSectionSetConditionalOptions
        };
        return (
            <GridFormContext.Provider value={value}>
                {this.state.loaded && this.props.children}
            </GridFormContext.Provider>
        );
    }
}

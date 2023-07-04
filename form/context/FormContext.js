import React, { createContext, useContext } from "react";
import { autofetchAPIService } from "../../../shared/infra/service";
import Formula from "../core/Formula";

export const FormContext = createContext();

export function useForm() {
    return useContext(FormContext);
}

export class FormProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            formData: {},
        };

        this.initialFormData = {};

        this.formDetails = this.props.formDetails;
        this.recordId = null;

        this.referenceIdAndElementIdMap = {};
        this.referenceFormulasMap = {};
        this.referenceOnChangeQueryMap = {};

        this.setFormData = this.setFormData.bind(this);
        this.setupForm = this.setupForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.getElementId = this.getElementId.bind(this);
        this.bulkUpdateFormData = this.bulkUpdateFormData.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetFormData = this.resetFormData.bind(this);
        this.setRecordId = this.setRecordId.bind(this);
        this.fetchElements = this.fetchElements.bind(this);
    }

    async componentDidMount() {
        await this.fetchElements();

        this.setState({ loaded: true });
    }

    async fetchElements() {}
    /**
     *
     * @param {string} recordId
     */
    setRecordId(recordId) {
        this.recordId = recordId;
    }

    /**
     *
     * @param {object} data
     */
    setFormData(data) {}

    /**
     *
     * @param {object} data
     * @param {FormulaManager} formulaManager
     */
    setupForm(data, formulaManager) {}

    updateFormData(key, value) {}

    bulkUpdateFormData(items = []) {}

    resetFormData() {}

    getElementId(id) {
        return !!this.referenceIdAndElementIdMap[id]
            ? this.referenceIdAndElementIdMap[id]
            : id;
    }

    createReferenceFormulasMap(elements) {
        for (const element of elements) {
            this.referenceIdAndElementIdMap[element.property.referenceId] =
                element.id;

            const latestFormula = new Formula(element.property.formula);

            for (const reference of latestFormula.references) {
                const previousFormulas = !!this.referenceFormulasMap[reference]
                    ? this.referenceFormulasMap[reference]
                    : [];

                this.referenceFormulasMap[reference] = [
                    ...previousFormulas,
                    latestFormula,
                ];
            }
        }
    }

    createOnChangeQueryReferenceList(elements) {
        const queryReferenceList = this.getOnChangeQueryReferenceList(elements);
        queryReferenceList.forEach((refrenceObj) => {
            for (let key in refrenceObj) {
                if (!refrenceObj[key]) {
                    return;
                }
                JSON.parse(refrenceObj[key]).forEach((id) => {
                    if (this.referenceOnChangeQueryMap[id]) {
                        this.referenceOnChangeQueryMap[id] = {
                            valuesOf: JSON.parse(refrenceObj[key]),
                            updateValueOf:
                                this.referenceOnChangeQueryMap[
                                    id
                                ].updateValueOf.add(key),
                        };
                    } else {
                        this.referenceOnChangeQueryMap[id] = {
                            valuesOf: JSON.parse(refrenceObj[key]),
                            updateValueOf: new Set([key]),
                        };
                    }
                });
            }
        });
    }

    getOnChangeQueryReferenceList(elements) {
        const onChangeQueryReferenceList = [];
        elements.forEach((element) => {
            if (element.property.onChangeQuery) {
                onChangeQueryReferenceList.push({
                    [element.property.referenceId]:
                        element.property.onChangeElements,
                });
            }
        });
        return onChangeQueryReferenceList;
    }

    async submitForm() {}
}

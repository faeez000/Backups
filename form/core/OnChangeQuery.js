import { onChangeQueryApiService } from "../services";

export default class OnChangeQuery {
    constructor() {
        /**
         * @private
         */
        this.data = null;
    }
    setupData(data) {
        this.data = data;
    }
    setElements(elements) {
        this.elements = elements;
    }
    async execute({
        onChangeQueryElement,
        getElementId,
        formId,
        handleBulkUpdate,
        setLoader,
    }) {
        setLoader(true);
        const { success, valueChangedElements } =
            await onChangeQueryApiService.getOnChangeQueryValues(
                formId,
                this.elementsValuesFromData(onChangeQueryElement, getElementId)
            );

        if (success) {
            let values = this.getValuesObj(valueChangedElements);
            handleBulkUpdate(values);
        }
        setLoader(false);
    }

    getValuesObj(valueChangedElements) {
        return valueChangedElements.update_elements.map((element) => {
            return {
                key: element.ref_id,
                value: element.elementvalue,
            };
        });
    }

    checkAndExistElement(referenceId, getElementId) {
        if (this.data.bottomElements[getElementId(referenceId)]) {
            return this.data.bottomElements[getElementId(referenceId)];
        } else if (this.data.mainElements[getElementId(referenceId)]) {
            return this.data.mainElements[getElementId(referenceId)];
        }
        return false;
    }

    isGridForm() {
        return this.data.bottomElements;
    }

    elementsValuesFromData(onChangeQueryElement, getElementId) {
        let valuseOfDto;
        let updateToDto;

        if (this.isGridForm()) {
            updateToDto = [...onChangeQueryElement.updateValueOf]?.map(
                (referenceId) => {
                    return {
                        ref_id: referenceId,
                        elementid: this.checkAndExistElement(
                            referenceId,
                            getElementId
                        )?.elementId,
                        elementvalue: this.checkAndExistElement(
                            referenceId,
                            getElementId
                        )?.value,
                    };
                }
            );

            valuseOfDto = onChangeQueryElement.valuesOf.map((referenceId) => {
                return {
                    ref_id: referenceId,
                    elementid: this.checkAndExistElement(
                        referenceId,
                        getElementId
                    )?.elementId,
                    elementvalue: this.checkAndExistElement(
                        referenceId,
                        getElementId
                    )?.value,
                };
            });
        } else {
            updateToDto = [...onChangeQueryElement.updateValueOf]?.map(
                (referenceId) => {
                    return {
                        ref_id: referenceId,
                        elementid:
                            this.data[getElementId(referenceId)]?.elementId,
                        elementvalue:
                            this.data[getElementId(referenceId)]?.value,
                    };
                }
            );

            valuseOfDto = onChangeQueryElement.valuesOf.map((referenceId) => {
                return {
                    ref_id: referenceId,
                    elementid: this.data[getElementId(referenceId)]?.elementId,
                    elementvalue: this.data[getElementId(referenceId)]?.value,
                };
            });
        }

        return {
            value_elements: valuseOfDto,
            update_elements: updateToDto,
        };
    }
}

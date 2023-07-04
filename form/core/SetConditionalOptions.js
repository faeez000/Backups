import { autofetchAPIService } from "../../../shared/infra/service";
import { elementAPIService } from "../services";

export default class SetConditionalOptions {
    constructor() {
        /**
         * @private
         */
        this.data = null;
    }
    setupData(data) {
        this.data = data;
    }

    async executeOptionsFetching({ formId, elementId, conditionalElements, setOptions, setLoader, getElementId }) {
        setLoader(true)

        const { success, options } =
            await elementAPIService.getOnChangeDropdownOptions(
                formId,
                this.elementsValuesFromData(conditionalElements, getElementId,elementId)
            );

        if (success) {
            setOptions(options[0]?.value);
        }

        // setLoader(false);
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

    elementsValuesFromData(conditionalElements, getElementId, elementId) {
        let valuseOfDto;
        let updateToDto;

        if (this.isGridForm()) {
            updateToDto = {
                elementid:elementId,
                elementvalue: null,
            };

            valuseOfDto = JSON.parse(conditionalElements).map((referenceId) => {
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
            updateToDto = {
                        elementid:elementId,
                        elementvalue:null,
                    };
                }

            valuseOfDto = JSON.parse(conditionalElements).map((referenceId) => {
                return {
                    ref_id: referenceId,
                    elementid: this.data[getElementId(referenceId)]?.elementId,
                    elementvalue: this.data[getElementId(referenceId)]?.value,
                };
            });
        

        return {
            value_elements: valuseOfDto,
            update_elements: [updateToDto],
        };
    }

}

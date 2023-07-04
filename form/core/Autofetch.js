import { autofetchAPIService } from "../../../shared/infra/service";

export default class Autofetch {
    async perform({ formId, elementId, value, handleBulkUpdate, setLoader }) {
        setLoader(true);

        const { success, values } =
            await autofetchAPIService.getAutofetchValues(
                formId,
                elementId,
                value
            );

        if (success) {
            handleBulkUpdate(values);
        }

        setLoader(false);
    }
}

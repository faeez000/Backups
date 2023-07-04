import { onLoadQueryService } from "../../../shared/infra/service";

export default class OnLoadQuery {
    async execute({ formId, elementId }) {
        const { success, values } = await onLoadQueryService.getElementValues(
            formId,
            elementId
        );

        if (success) {
            values[0] = {
                key: values[0]?.elementid,
                value: values[0]?.value,
            };
            return values;
        }
    }
}

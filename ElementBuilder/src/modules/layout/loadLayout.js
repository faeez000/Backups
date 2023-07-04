import { layoutModalBody } from "../../shared/domElements.js";
import { variables } from "../../shared/variables.js";
import { generateLayout } from "./generateLayout.js";

// @ts-ignore
$(variables.layoutModalId).on("show.bs.modal", function (e) {
    loadLayout();
});
export function loadLayout() {
    layoutModalBody.innerHTML = generateLayout(
        variables.formId,
        variables.formType
    );
}

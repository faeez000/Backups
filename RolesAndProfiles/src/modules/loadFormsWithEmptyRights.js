import RightModel from "../domain/RightModel.js";
import RightList from "../domain/valueObject/RightList.js";
import { rightService } from "../services/index.js";
import { createRightsTbody } from "../shared/elements.js";
import { createTableRow } from "./createTableRow.js";

// @ts-ignore
export async function loadFormsWithEmptyRights() {
    const { success, formsnames } = await rightService.getformsnames();

    const response = await rightService.getRights();

    const rightList = new RightList(response.rights);

    if (!success) {
        return;
    }

    createRightsTbody.innerHTML = "";

    formsnames.forEach(
        /**
         * @param {RightModel} forms
         */
        (forms) => {
            const right = rightList.getRightByFormId(
                forms["formId"],
                forms["rights_id"]
            );

            createRightsTbody.appendChild(
                createTableRow(forms["formId"], forms["form_name"], right)
            );
        }
    );
}

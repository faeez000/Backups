import RightModel from "../../domain/RightModel.js";
import { rightService } from "../../services/index.js";
import {
    rightItemContainer,
    editRightsTbody,
    createRightsTbody,
} from "../../shared/elements.js";
import { createTableRow, editTableRow } from "../createTableRow.js";
import { rightName } from "./components/rightName.js";

let RightList;

export async function loadRightItems() {
    rightItemContainer.innerHTML = "fetching...";
    const { success, rights } = await rightService.getRights();
    if (!success) {
        return;
    }
    RightList = rights;
    rightItemContainer.innerHTML = "";
    rights.forEach(
        /**
         *
         * @param {RightModel} right
         */
        (right) => {
            const rightModel = new RightModel(
                right["rights_id"],
                right["rights_name"]
            );
            rightItemContainer.innerHTML += rightName(right);
        }
    );
}

export async function loadformsNames() {
    const { success, formsnames } = await rightService.getformsnames();
    if (!success) {
        return;
    }

    createRightsTbody.innerHTML = "";

    formsnames.forEach(
        /**
         * @param {RightModel} forms
         */
        (forms) => {
            // createRightsTbody.appendChild(
            //     createTableRow(forms["form_name"],forms["form_name"])
            // );
        }
    );
}

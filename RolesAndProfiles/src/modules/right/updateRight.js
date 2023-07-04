import {
    createRightsTbody,
    editRightForm,
    editRightClose,
    rightsName,
    editRightsTbody,
} from "../../shared/elements.js";
import { loadRightItems } from "./loadRightsItems.js";
import { loadRightsNames } from "../loadrightsnames.js";
import RightModel from "../../domain/RightModel.js";
import { rightService } from "../../services/index.js";
import { checkSavedValue, editTableRow } from "../createTableRow.js";
import RightList from "../../domain/valueObject/RightList.js";

let rightId;
// @ts-ignore
$("#edit-right-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    rightId = el.getAttribute("data-id");
    rightsName.value = el.getAttribute("data-right-name");

    const { success, formsnames } = await rightService.getformsnames();

    const { rightDetails } = await rightService.getRightsDetailsById(rightId);

    if (!success) {
        return;
    }
    editRightsTbody.innerHTML = "";
    //this for loop for create only checkboxes
    formsnames.forEach(
        /**
         * @param {RightModel} forms
         */
        (forms) => {
            editRightsTbody.appendChild(
                editTableRow(forms["formId"], forms["form_name"], rightId)
            );
        }
    );

    //this for loop for check the checkbox by Id
    rightDetails.forEach((right) => {
        if (document.getElementById(`${right.rights_form_id}-edit-view`)) {
            document.getElementById(
                `${right.rights_form_id}-edit-view`
            ).checked = right.view_permission;
        }
        if (document.getElementById(`${right.rights_form_id}-edit-edit`)) {
            document.getElementById(
                `${right.rights_form_id}-edit-edit`
            ).checked = right.edit_permission;
        }
        if (document.getElementById(`${right.rights_form_id}-edit-create`)) {
            document.getElementById(
                `${right.rights_form_id}-edit-create`
            ).checked = right.create_permission;
        }
        if (document.getElementById(`${right.rights_form_id}-edit-delete`)) {
            document.getElementById(
                `${right.rights_form_id}-edit-delete`
            ).checked = right.delete_permission;
        }
    });
});

export async function updateRight(checkboxid, formid, rightId, permissionType) {
    /**
     * @type {HTMLInputElement}
     */
    const checkbox = document.querySelector(`[id="${checkboxid}"]`);
    //find all checkbox value in row by formid
    const viewcheckbox = document.querySelector(`[id="${formid}-edit-view"]`);
    const createcheckbox = document.querySelector(
        `[id="${formid}-edit-create"]`
    );
    const editcheckbox = document.querySelector(`[id="${formid}-edit-edit"]`);
    const deletecheckbox = document.querySelector(
        `[id="${formid}-edit-delete"]`
    );

    /**
     * @type {HTMLInputElement}
     */
    const rightname = document.querySelector(`[id="rights-name"]`);
    if (rightname.value === null || rightname.value === "") {
        //@ts-ignore
        new SnackBar({
            message: "Please fill right name",
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        // @ts-ignore
        checkbox.checked = false;
        return;
    }

    const right = new RightModel();
    right.rights_id = rightId;
    right.rights_name = rightname.value;
    right.rights_form_id = formid;
    right[`view_permission`] = viewcheckbox.checked;
    right[`create_permission`] = createcheckbox.checked;
    right[`edit_permission`] = editcheckbox.checked;
    right[`delete_permission`] = deletecheckbox.checked;

    const { success, message } = await rightService.update(right);

    if (!success) {
        // @ts-ignore
        new SnackBar({
            message,
            status: "info",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
}

editRightClose.addEventListener("click", async (e) => {
    // e.preventDefault();
    let clearSearch = document.getElementById("rights-serach-forms-input-edit");
    clearSearch.value = "";

    // const targetTDs = editRightsTbody.querySelectorAll("tr > td:nth-child(2)");
    // for (let i = 0; i < targetTDs.length; i++) {
    //     const td = targetTDs[i];
    //     const parendNode = td.parentNode;
    //     parendNode.style.display = "abc";
    //     // alert("hello");
    // }

    $("#edit-right-modal").modal("hide");
    await loadRightItems();
    await loadRightsNames();
    // @ts-ignore

    return;
});

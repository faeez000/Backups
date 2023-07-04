import { editRightsNameForm, rightsName } from "../../shared/elements.js";
import { loadRightItems } from "./loadRightsItems.js";
import { rightService } from "../../services/index.js";
import { loadRightsNames } from "../loadrightsnames.js";
import RightNameModel from "../../domain/RightNameModel.js";

let rightId, rightName;

// @ts-ignore
$("#edit-right-name-modal").on("show.bs.modal", async function (e) {
    const el = $(e.relatedTarget)[0];

    rightId = el.getAttribute("data-id");
    rightsName.value = el.getAttribute("data-right-name");
    document.getElementById("edit-rights-name").value = rightsName.value;
});

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9 s]*$/.test(str);
  }

editRightsNameForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rightname = document.querySelector(`[id="edit-rights-name"]`);
    const right = new RightNameModel();
   
    const rightNameValue = rightname.value.trim();
    const checkedRightNameValue = onlyLettersAndNumbers(rightNameValue)
    
    if(!checkedRightNameValue){
        new SnackBar({
            message: "Special Characters Are Not Allowed!",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    right.rights_id = rightId;
    right.rights_name = rightNameValue;


    if (!right.rights_name) {
        new SnackBar({
            message: "Right Name Can't be Empty",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }
    const { success, message } = await rightService.updateRightName(
        right.rights_name,
        right.rights_id
    );

    if (!success) {
        // @ts-ignore
        new SnackBar({
            message,
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    $("#edit-right-name-modal").modal("hide");
    await loadRightItems();
    await loadRightsNames();
    // @ts-ignore

    return;
});

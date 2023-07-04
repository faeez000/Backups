import { createNewRightName, newRightsName } from "../../shared/elements.js";
import { loadRightItems } from "./loadRightsItems.js";
import { rightService } from "../../services/index.js";
import { loadRightsNames } from "../loadrightsnames.js";
import RightModel from "../../domain/RightModel.js";
import { variables } from "../../shared/variables.js";
import RightNameModel from "../../domain/RightNameModel.js";

// @ts-ignore
$("#create-right-name-modal").on("show.bs.modal", async function (e) {
    // @ts-ignore
    const el = $(e.relatedTarget)[0];

    const right = new RightModel();
    variables.RIGHT_ID = right.rights_id;
    newRightsName.setAttribute("data-right-id", right.rights_id);
});
// @ts-ignore
$("#create-right-name-modal").on("hidden.bs.modal", function (e) {
    variables.RIGHT_ID = null;
});

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9 s]*$/.test(str);
  }

createNewRightName.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rightname = document.querySelector(`[id="new-rights-name"]`);
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

    right.rights_name = rightNameValue
    

    if (!right.rights_name) {
        new SnackBar({
            message: "Right Name Can't be Empty",
            status: "error",
            dismissible: true,
            timeout: 5000,
        });
        return;
    }

    const { success, message } = await rightService.add(
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
    


    $("#create-right-name-modal").modal("hide");
    await loadRightItems();
    await loadRightsNames();
    // @ts-ignore
    e.target.reset();
    
    return;
});

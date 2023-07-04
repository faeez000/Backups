import {
    searchFormInputInNewRights,
    searchFormInputInEditRights,
    createRightsTbody,
    editRightsTbody,
} from "../../shared/elements.js";

searchFormInputInEditRights.addEventListener(
    "keyup",
    serachFormsInRightsByFormName
);

function serachFormsInRightsByFormName(event) {
    const targetTDs = editRightsTbody.querySelectorAll("tr > td:nth-child(2)");
    for (let i = 0; i < targetTDs.length; i++) {
        const td = targetTDs[i];
        const parendNode = td.parentNode;
        parendNode.style.display = td.innerHTML
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
            ? ""
            : "none";
    }
    return;
}

import { newRightsName } from "../shared/elements.js";
import { updateRight } from "./right/updateRight.js";

/**
 *
 * @param {string} formid
 * @param {string} name
 * viewPermission,createPermission,editPermission,deletePermission
 */

export function createTableRow(formid, name, rights) {
    const collectRights = rights;
    const rightname = newRightsName.value;

    var td = document.createElement("td");
    td.textContent = "";

    var tdformname = document.createElement("td");
    tdformname.textContent = name;

    var td1 = document.createElement("td");
    var chk1 = document.createElement("input");
    chk1.setAttribute("type", "checkbox");
    chk1.setAttribute("id", formid + "-create-view");
    chk1.setAttribute("data-formId", formid);
    chk1.setAttribute("data-formName", name);
    chk1.setAttribute("data-permissionType", "view");
    chk1.addEventListener("change", () => {});
    td1.appendChild(chk1);

    var td2 = document.createElement("td");
    const chk2 = document.createElement("input");
    chk2.setAttribute("type", "checkbox");
    chk2.setAttribute("id", formid + "-create-create");
    chk2.setAttribute("data-formId", formid);
    chk2.setAttribute("data-formName", name);
    chk2.setAttribute("data-permissionType", "create");
    chk2.addEventListener("change", () => {});
    td2.appendChild(chk2);

    var td3 = document.createElement("td");
    const chk3 = document.createElement("input");
    chk3.setAttribute("type", "checkbox");
    chk3.setAttribute("id", formid + "-create-edit");
    chk3.setAttribute("data-formName", name);
    chk3.setAttribute("data-formId", formid);
    chk3.setAttribute("data-permissionType", "edit");
    chk3.addEventListener("change", () => {});
    td3.appendChild(chk3);

    var td4 = document.createElement("td");
    const chk4 = document.createElement("input");
    chk4.setAttribute("type", "checkbox");
    chk4.setAttribute("id", formid + "-create-delete");
    chk4.setAttribute("data-formName", name);
    chk4.setAttribute("data-formId", formid);
    chk4.setAttribute("data-permissionType", "delete");
    chk4.addEventListener("change", () => {});
    td4.appendChild(chk4);

    var tr = document.createElement("tr");
    tr.appendChild(td);
    tr.appendChild(tdformname);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    return tr;
}

export function editTableRow(formid, name, rights_id) {
    var td = document.createElement("td");
    td.textContent = "";

    var tdformname = document.createElement("td");
    tdformname.textContent = name;

    var td1 = document.createElement("td");
    var chk1 = document.createElement("input");
    chk1.setAttribute("type", "checkbox");
    chk1.setAttribute("id", formid + "-edit-view");
    chk1.setAttribute("data-formId", formid);
    chk1.setAttribute("data-formName", name);
    chk1.setAttribute("data-permissionType", "view");
    // chk1.checked = !!collectRights?.view_permission
    //   ? collectRights?.view_permission
    //   : false;
    chk1.addEventListener("change", () => {
        updateRight(formid + "-edit-view", formid, rights_id, "view");
    });
    td1.appendChild(chk1);

    var td2 = document.createElement("td");
    const chk2 = document.createElement("input");
    chk2.setAttribute("type", "checkbox");
    chk2.setAttribute("id", formid + "-edit-create");
    chk2.setAttribute("data-formId", formid);
    chk2.setAttribute("data-formName", name);
    chk2.setAttribute("data-permissionType", "create");
    // chk2.checked = !!collectRights?.create_permission
    //   ? collectRights?.create_permission
    //   : false;
    chk2.addEventListener("change", () => {
        updateRight(formid + "-edit-create", formid, rights_id, "create");
    });
    td2.appendChild(chk2);

    var td3 = document.createElement("td");
    const chk3 = document.createElement("input");
    chk3.setAttribute("type", "checkbox");
    chk3.setAttribute("id", formid + "-edit-edit");
    chk3.setAttribute("data-formName", name);
    chk3.setAttribute("data-formId", formid);
    chk3.setAttribute("data-permissionType", "edit");
    // chk3.checked = !!collectRights?.edit_permission
    //   ? collectRights?.edit_permission
    //   : false;
    chk3.addEventListener("change", () => {
        updateRight(formid + "-edit-edit", formid, rights_id, "edit");
    });
    td3.appendChild(chk3);

    var td4 = document.createElement("td");
    const chk4 = document.createElement("input");
    chk4.setAttribute("type", "checkbox");
    chk4.setAttribute("id", formid + "-edit-delete");
    chk4.setAttribute("data-formName", name);
    chk4.setAttribute("data-formId", formid);
    chk4.setAttribute("data-permissionType", "delete");
    // chk4.checked = !!collectRights?.delete_permission
    //   ? collectRights?.delete_permission
    //   : false;
    chk4.addEventListener("change", () => {
        updateRight(formid + "-edit-delete", formid, rights_id, "delete");
    });
    td4.appendChild(chk4);

    var tr = document.createElement("tr");
    tr.appendChild(td);
    tr.appendChild(tdformname);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    return tr;
}

export function checkSavedValue(formid, rights) {
    var chk1 = document.createElement("input");
    chk1.setAttribute("type", "checkbox");
    chk1.setAttribute("id", formid + "-edit-view");
    chk1.checked = rights.view_permission;

    var chk2 = document.createElement("input");
    chk2.setAttribute("type", "checkbox");
    chk2.setAttribute("id", formid + "-edit-create");
    chk2.checked = !!rights?.create_permission
        ? rights?.create_permission
        : false;

    var chk3 = document.createElement("input");
    chk3.setAttribute("type", "checkbox");
    chk3.setAttribute("id", formid + "-edit-edit");
    chk3.checked = !!rights?.view_permission ? rights?.view_permission : false;

    var chk4 = document.createElement("input");
    chk4.setAttribute("type", "checkbox");
    chk4.setAttribute("id", formid + "-edit-delete");
    chk4.checked = !!rights?.view_permission ? rights?.view_permission : false;
    return chk1, chk2, chk3, chk4;
}

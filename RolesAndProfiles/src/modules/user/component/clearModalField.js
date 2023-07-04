import {
    newEmail,
    selectUserProfileForUser,
    cancelBtnNewUser,
    cancelCrossBtnNewUser,
    adminCheck,
    cancelCrossBtnNewProfile,
    cancelBtnNewProfile,
    newProfileName,
    newProfileDescription,
    selectRightsNameForProfile,
    selectMobileLandingPageforProfile,
    newRightName,
    cancelCrossBtnNewRights
} from "../../../shared/elements.js";


function clearBootstrapfieldOnCancel(field, btn) {

    if (field.type === "text" || field.type === "select-one") {
        btn?.addEventListener("click", () => (field.value = ""));
    }

    if (field.type === "checkbox") {
        btn?.addEventListener("click", () => (field.checked = false));
    }
}
// new user modal clear
clearBootstrapfieldOnCancel(newEmail, cancelBtnNewUser);
clearBootstrapfieldOnCancel(selectUserProfileForUser, cancelBtnNewUser);
clearBootstrapfieldOnCancel(adminCheck, cancelBtnNewUser);

clearBootstrapfieldOnCancel(newEmail, cancelCrossBtnNewUser);
clearBootstrapfieldOnCancel(selectUserProfileForUser, cancelCrossBtnNewUser);
clearBootstrapfieldOnCancel(adminCheck, cancelCrossBtnNewUser);

//new prodile clear
clearBootstrapfieldOnCancel(newProfileName, cancelCrossBtnNewProfile);
clearBootstrapfieldOnCancel(newProfileDescription, cancelCrossBtnNewProfile);
clearBootstrapfieldOnCancel(selectRightsNameForProfile, cancelCrossBtnNewProfile);
clearBootstrapfieldOnCancel(selectMobileLandingPageforProfile, cancelCrossBtnNewProfile);

clearBootstrapfieldOnCancel(newProfileName, cancelBtnNewProfile);
clearBootstrapfieldOnCancel(newProfileDescription, cancelBtnNewProfile);
clearBootstrapfieldOnCancel(selectRightsNameForProfile, cancelBtnNewProfile);
clearBootstrapfieldOnCancel(selectMobileLandingPageforProfile, cancelBtnNewProfile);

// new rights clear
clearBootstrapfieldOnCancel(newRightName, cancelCrossBtnNewRights );

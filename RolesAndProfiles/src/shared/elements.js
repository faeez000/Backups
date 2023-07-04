const profileItemContainer = document.querySelector(".form-item-container");
const roleItemContainer = document.querySelector(".category-container");
const userItemContainer = document.querySelector(".user-container");
const rightItemContainer = document.querySelector(".right-container");

/**
 * @type {HTMLFormElement}
 */
const createRightsTbody = document.querySelector("#createRightsTbody");

/**
 * @type {HTMLTableElement}
 */
const editRightsTbody = document.querySelector("#editRightsTbody");

/**
 * @type {HTMLFormElement}
 */
const createNewProfileForm = document.querySelector("#create-new-profile");

/**
 * @type {HTMLFormElement}
 */
const createNewRightForm = document.querySelector("#create-new-rights");
const createNewRightName = document.querySelector("#create-new-rights-name");

/**
 * @type {HTMLFormElement}
 */
const deleteRightForm = document.querySelector("#delete-right");

/**
 * @type {HTMLFormElement}
 */
const deleteUserForm = document.querySelector("#delete-user");

/**
 * @type {HTMLFormElement}
 */
const deleteProfileForm = document.querySelector("#delete-profile");

/**
 * @type {HTMLFormElement}
 */
const editProfileForm = document.querySelector("#edit-profile");
/**
 * @type {HTMLFormElement}
 */
const createNewRoleForm = document.querySelector("#create-new-role");
/**
 * @type {HTMLFormElement}
 */
const updateRoleForm = document.querySelector("#edit-role");

/**
 * @type {HTMLFormElement}
 */
const deleteRoleForm = document.querySelector("#delete-role");

/**
 * @type {HTMLInputElement}
 */
const saveOrganizationbtn = document.querySelector("#save-organization-btn");

/**
 * @type {HTMLInputElement}
 */
const organizationName = document.querySelector("#company-name");

/**
 * @type {HTMLInputElement}
 */
const organizationlogo = document.querySelector("#company-logo");

/**
 * @type {HTMLInputElement}
 */
const organizationSize = document.querySelector("#company-size");

/**
 * @type {HTMLInputElement}
 */
const hierarchyTypeName = document.querySelector("#hierarchy-type-name");

/**
 * @type {HTMLInputElement}
 */
const industryType = document.querySelector("#industry-type");

/**
 * @type {HTMLInputElement}
 */
const selectRightsNameForProfile = document.querySelector("#select-right-id");

/**
 * @type {HTMLInputElement}
 */
const edtProfileName = document.querySelector("#edit-profile-name");
/**
 * @type {HTMLInputElement}
 */
const editselectRightsNameForProfile = document.querySelector(
    "#edit-select-rights-id"
);
/**
 * @type {HTMLInputElement}
 */
const editProfileDescriptionForProfile = document.querySelector(
    "#edit-profile-description"
);

/**
 * @type {HTMLInputElement}
 */
const selectMobileLandingPageforProfile = document.querySelector(
    "#mobile-landing-page"
);

/**
 * @type {HTMLInputElement}
 */
const editMobileLandingPageforProfile = document.querySelector(
    "#edit-mobile-landing-page"
);

/**
 * @type {HTMLInputElement}
 */
const editRoleImageInput = document.querySelector("#edit-role-image-input");

/**
 * @type {HTMLFormElement}
 */
const createNewUserForm = document.querySelector("#create-new-user");

/**
 * @type {HTMLFormElement}
 */
const editUserForm = document.querySelector("#edit-user");

/**
 * @type {HTMLInputElement}
 */
const newRoleName = document.querySelector("#new-role-name");

/**
 * @type {HTMLInputElement}
 */
const editRoleName = document.querySelector("#edit-role-name");

/**
 * @type {HTMLInputElement}
 */
const reportsTo = document.querySelector("#reports-to");

/**
 * @type {HTMLInputElement}
 */
const editReportsTo = document.querySelector("#edit-reports-to");

/**
 * @type {HTMLInputElement}
 */
const AccessibleToSameLevel = document.querySelector(
    "accessible-to-same-level"
);

/**
 * @type {HTMLInputElement}
 */
const editAccessibleToSameLevel = document.querySelector(
    "#edit-accessible-to-same-level"
);

/**
 * @type {HTMLInputElement}
 */
const DescriptionForRole = document.querySelector("#new-description-for-role");

/**
 * @type {HTMLInputElement}
 */
const editDescriptionForRole = document.querySelector(
    "#edit-description-for-role"
);

/**
 * @type {HTMLInputElement}
 */
const editHiddenRoleImage = document.querySelector("#edit-role-image");

/**
 * @type {HTMLInputElement}
 */
const editRoleImageLabel = document.querySelector(
    "#edit-role-file-input-label"
);

/**
 * @type {HTMLInputElement}
 */
const selectUserRoleForUser = document.querySelector(
    "#select-user-role-for-user"
);

/**
 * @type {HTMLInputElement}
 */
const selectUserProfileForUser = document.querySelector(
    "#select-user-profile-for-user"
);
/**
 * @type {HTMLInputElement}
 */
const editEmailId = document.querySelector("#edit-email-id");
/**
 * @type {HTMLInputElement}
 */
const editUserRole = document.querySelector("#edit-user-role");
/**
 * @type {HTMLInputElement}
 */
const editUserProfile = document.querySelector("#edit-user-profile");
const editUserAdmin = document.querySelector("#edit-admin-check");

/**
 * @type {HTMLInputElement}
 */
const editUserRoleForUser = document.querySelector("#edit-user-role-for-user");

/**
 * @type {HTMLInputElement}
 */
const editUserProfileForUser = document.querySelector(
    "#edit-user-profile-for-user"
);

const editUserProfileContainer = document.querySelector("#edit-user-profile-container")

const editUserName = document.querySelector("#edit-user-name");

/**
 * @type {HTMLInputElement}
 */
const roleImageInput = document.querySelector("#role-image-input");

/**
 * @type {HTMLInputElement}
 */
const roleProfileImageInput = document.querySelector("#role-profile-image");

/**
 * @type {HTMLInputElement}
 */
const editRoleImage = document.querySelector("#edit-role-image");

/**
 * @type {HTMLLabelElement}
 */
const roleFileUploaderLabel = document.querySelector("#role-file-input-label");

/**
 * @type {HTMLLabelElement}
 */
const editRoleFileInputLabel = document.querySelector(
    "#edit-role-file-input-label"
);

/**
 * @type {HTMLDivElement}
 */
const roleHintContainer = document.querySelector("#role-form-hint-control");

/**
 * @type {HTMLInputElement}
 */
const newRightsName = document.querySelector("#new-rights-name");

/**
 * @type {HTMLInputElement}
 */
const searchFormInputInNewRights = document.querySelector(
    "#rights-serach-forms-input-new"
);
/**
 * @type {HTMLInputElement}
 */
const searchFormInputInEditRights = document.querySelector(
    "#rights-serach-forms-input-edit"
);

/**
 * @type {HTMLInputElement}
 */
 const searchRightsInput = document.querySelector(
    "#rights-serach-input"
);

/**
 * @type {HTMLInputElement}
 */
 const searchProfileInput = document.querySelector(
    "#profile-serach-input"
);

/**
 * @type {HTMLInputElement}
 */
 const searchUserInput = document.querySelector(
    "#user-serach-input"
);

/**
 * @type {HTMLDivElement}
 */
 const rightsContainer = document.querySelector(
    "#Rights-Container"
);

/**
 * @type {HTMLInputElement}
 */
const rightsName = document.querySelector("#rights-name");
const editRightsNameForm = document.querySelector("#edit-rights-name-form");
const editRightsName = document.querySelector("#edit-rights-name");

/**
 * @type {HTMLFormElement}
 */
const editRightForm = document.querySelector("#edit-rights");
const editRightClose = document.querySelector("#edit-rights-close");

/**
 * @type {HTMLInputElement}
 */
const newUserName = document.querySelector("#new-user-name");

/**
 * @type {HTMLInputElement}
 */
const newEmail = document.querySelector("#new-email");
const cancelBtnNewUser = document.querySelector(".cancel-new-user-btn");


const adminCheck = document.querySelector("#admin-checkbox");
const cancelCrossBtnNewUser = document.querySelector("#cancel-cross-btn-new-user");

const cancelCrossBtnNewProfile = document.querySelector("#cancel-cross-btn-new-profile");
const cancelBtnNewProfile = document.querySelector("#cancel-btn-new-profile");
const newProfileName = document.querySelector("#new-profile-name");
const newProfileDescription = document.querySelector("#new-description");


const newRightName = document.querySelector("#new-rights-name");
const cancelCrossBtnNewRights = document.querySelector("#cancel-cross-btn-new-rights");

const userModalProfileContainer = document.getElementById("user-modal-select-profile-container")

export {
    userModalProfileContainer,
    cancelCrossBtnNewRights,
    newRightName,
    cancelBtnNewProfile,
    newProfileDescription,
    newProfileName,
    cancelCrossBtnNewProfile,
    cancelCrossBtnNewUser,
    profileItemContainer,
    roleItemContainer,
    userItemContainer,
    rightItemContainer,
    createRightsTbody,
    editRightsTbody,
    createNewProfileForm,
    editProfileForm,
    createNewRoleForm,
    updateRoleForm,
    createNewUserForm,
    editUserForm,
    roleFileUploaderLabel,
    roleImageInput,
    roleProfileImageInput,
    roleHintContainer,
    selectUserRoleForUser,
    selectUserProfileForUser,
    newRoleName,
    reportsTo,
    editReportsTo,
    editDescriptionForRole,
    editHiddenRoleImage,
    editRoleImageLabel,
    edtProfileName,
    editAccessibleToSameLevel,
    editselectRightsNameForProfile,
    selectRightsNameForProfile,
    editProfileDescriptionForProfile,
    editRoleName,
    editEmailId,
    editUserRole,
    editUserProfile,
    editUserRoleForUser,
    editUserProfileForUser,
    editRoleImage,
    editRoleFileInputLabel,
    editRoleImageInput,
    rightsName,
    newRightsName,
    editRightForm,
    createNewRightForm,
    deleteRightForm,
    deleteProfileForm,
    deleteRoleForm,
    deleteUserForm,
    AccessibleToSameLevel,
    DescriptionForRole,
    organizationName,
    organizationlogo,
    organizationSize,
    hierarchyTypeName,
    industryType,
    saveOrganizationbtn,
    newUserName,
    newEmail,
    adminCheck,
    editUserAdmin,
    editUserName,
    searchFormInputInNewRights,
    searchFormInputInEditRights,
    createNewRightName,
    editRightClose,
    editRightsNameForm,
    editRightsName,
    selectMobileLandingPageforProfile,
    editMobileLandingPageforProfile,
    searchRightsInput,
    rightsContainer,
    searchProfileInput,
    searchUserInput,
    cancelBtnNewUser,
    editUserProfileContainer,
};

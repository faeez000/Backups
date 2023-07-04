const organizationItemContainer = document.querySelector(
    ".organization-container"
);

/**
 * @type {HTMLFormElement}
 */
const createOrganizationForm = document.querySelector(
    "#create-new-organization"
);

/**
 * @type {HTMLFormElement}
 */
const deleteOrganizationForm = document.querySelector("#delete-organization");
/**
 * @type {HTMLFormElement}
 */

const editOrganizationForm = document.querySelector("#edit-organization");

const searchOrganizationInput = document.querySelector("#Organization-serach-input");

/**
 * @type {HTMLInputElement}
 */
const organizationName = document.querySelector("#company-name");

/**
 * @type {HTMLInputElement}
 */
const editOrganizationName = document.querySelector("#edit-organization-name");

/**
 * @type {HTMLInputElement}
 */
const organizationlogo = document.querySelector("#company-logo");

/**
 * @type {HTMLInputElement}
 */
const editOrganizationLogo = document.querySelector("#edit-organization-logo");

/**
 * @type {HTMLInputElement}
 */
const createOrganizationLogoInput = document.querySelector(
    "#create-organization-logo-input"
);

/**
 * @type {HTMLInputElement}
 */
const editOrganizationLogoInput = document.querySelector(
    "#edit-organization-logo-input"
);

/**
 * @type {HTMLInputElement}
 */
const createOrganizationFileInputLabel = document.querySelector(
    "#create-organization-file-input-label"
);

/**
 * @type {HTMLInputElement}
 */
const editOrganizationFileInputLabel = document.querySelector(
    "#edit-organization-file-input-label"
);
/**
 * @type {HTMLInputElement}
 */
const organizationSize = document.querySelector("#company-size");

/**
 * @type {HTMLInputElement}
 */
const editOrganizationSize = document.querySelector("#edit-organization-size");

/**
 * @type {HTMLInputElement}
 */
const hierarchyTypeName = document.querySelector("#hierarchy-type-name");

/**
 * @type {HTMLInputElement}
 */
const editHierarchyTypeName = document.querySelector(
    "#edit-hierarchy-type-name"
);

/**
 * @type {HTMLInputElement}
 */
const industryType = document.querySelector("#industry-type");
/**
 * @type {HTMLInputElement}
 */
const editIndustryType = document.querySelector("#edit-industry-type");

const roleHintContainer = document.querySelector("#role-hint-container");

export {
    createOrganizationForm,
    deleteOrganizationForm,
    editOrganizationForm,
    organizationItemContainer,
    organizationName,
    organizationlogo,
    createOrganizationLogoInput,
    editOrganizationLogoInput,
    createOrganizationFileInputLabel,
    editOrganizationFileInputLabel,
    organizationSize,
    hierarchyTypeName,
    industryType,
    editOrganizationName,
    editOrganizationLogo,
    editOrganizationSize,
    editHierarchyTypeName,
    editIndustryType,
    roleHintContainer,
    searchOrganizationInput,
};

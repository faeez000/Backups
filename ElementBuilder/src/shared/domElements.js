const elementContainer = document.querySelector(".element-container");
const mainContainer = document.querySelector(".main-container");
const propertiesForm = document.querySelector("#properties-form");
const propertiesModalBody = document.querySelector(
    "#properties-modal .modal-body"
);
const propertyFieldContainer = document.querySelector(
    ".property-field-container"
);
/**
 * @type {HTMLDivElement}
 */
const hintContainer = document.querySelector(".hint-container");

const autofetchDetailsForm = document.querySelector("#autofetch-detail-form");
const optionCustomDetailsForm = document.querySelector(
    "#option-custom-details-form"
);
const optionReferenceDetailsForm = document.querySelector(
    "#option-reference-details-form"
);

const dataReferenceDetailsForm = document.querySelector("#data-Reference-detail-form")

const cardDataReferenceDetailsForm = document.querySelector("#card-Data-Reference-detail-form")
 
const typeJsonForm = document.querySelector('#type-Json-Form')
 
const chipAndAvtarDataReferenceForm = document.querySelector("#avtar-Data-Reference-detail-form")

const loadFragmentForm = document.querySelector('#load-Fragment-Form')

const iconActionForm = document.querySelector('#icon-Action-Form')

const buttonRedirectionForm = document.querySelector("#redirect-To-CleverlyWork-Form")

const condionalReferenceDetailForm = document.querySelector("#Conditional-reference-details-form")

/**
 * @type {HTMLSelectElement}
 */
const redirectionValueDropdown = document.querySelector("#redirection-To-Value-list");
const redirectionTypeDropdown = document.querySelectorAll("#redirection-Type-list");
const instanceBehaviourForm = document.querySelector('#instance-Behaviour-Form');
const redirectionValueTextArea = document.querySelector('#redirection-To-Value-TextArea');


/**
 * @type {HTMLSelectElement}
 */
const tableDropdown = document.querySelector("#autofetch-detail-form #table");

/**
 * @type {HTMLSelectElement}
 */
const columnDropdown = document.querySelector("#autofetch-detail-form #column");

/**
 * @type {HTMLSelectElement}
 */
const whereColumnDropdown = document.querySelector(
    "#autofetch-detail-form #where-column"
);

/**
 * @type {HTMLSelectElement}
 */
const primaryElementDropdown = document.querySelector(
    "#autofetch-detail-form #primary-element"
);

/**
 * @type {HTMLSelectElement}
 */
const optionTableDropdown = document.querySelector("#option-table");

const optionValueElement = document.querySelector("#option-value");

/**
 * @type {HTMLSelectElement}
 */
const optionColumnDropdown = document.querySelector("#option-column");
const deleteElementForm = document.querySelector("#delete-element-form");
const formNameElement = document.querySelector("#form-name");
const formTypeElement = document.querySelector("#form-type");



/**
 * @type {HTMLSelectElement}
 */
const typeJsonTextarea = document.querySelector('#type-Json');
const redirectToUrlTextarea = document.querySelector('#redirect-To-Url');
const redirectToFormDropdown = document.querySelector('#redirect-To-Form-list');
const redirectToFormForm = document.querySelector('#redirect-To-Form');
const redirectToUrlForm = document.querySelector('#redirect-To-Url-Form');

/**
 * @type {HTMLSelectElement}
 */
const loadFragmentDropdown = document.querySelector('#load-Fragment-list');
const iconActionDropdown = document.querySelector('#icon-Action-list')


/**
 * @type {HTMLSelectElement}
 */
 const dataReferenceTableDropdown = document.querySelector("#data-Reference-detail-form #reference-Table");
 const dataReferenceTitleDropdown = document.querySelector("#data-Reference-detail-form #title-Column ");
 const dataReferenceSubtitleDropdown = document.querySelector("#data-Reference-detail-form #subtitle-Column");
 const dataReferenceImageDropdown = document.querySelector("#data-Reference-detail-form #image-Column");

/**
 * @type {HTMLSelectElement}
 */
 const chipAndAvtarDataReferenceTableDropdown = document.querySelector("#avtar-Data-Reference-detail-form #avtar-Reference-Table");
 const chipAndAvtarDataReferenceTitleDropdown = document.querySelector("#avtar-Data-Reference-detail-form #avtar-Title-Column ");
 const chipAndAvtarDataReferenceImageDropdown = document.querySelector("#avtar-Data-Reference-detail-form #avtar-Image-Column");

 /**
 * @type {HTMLSelectElement}
 */
const sectionElementListDropdown = document.querySelector('#Conditional-reference-details-form #element-List');

/**
 * @type {HTMLTextAreaElement}
 */

const optionsQueryTextArea = document.querySelector('#Conditional-reference-details-form #query-value')

/**
 * @type {HTMLButtonElement}
 */
 const saveConditionalOptionReferenceDetailsButton = document.querySelector("#save-conditional-option-btn");

 /**
 * @type {HTMLSelectElement}
 */
  const cardDataReferenceTableDropdown = document.querySelector("#card-Data-Reference-detail-form #card-Reference-Table");
  const cardDataReferenceTitleDropdown = document.querySelector("#card-Data-Reference-detail-form #card-Title-Column");
  const cardDataReferenceSubtitleDropdown = document.querySelector("#card-Data-Reference-detail-form #card-Subtitle-Column");
  const cardDataReferenceImageDropdown = document.querySelector("#card-Data-Reference-detail-form #card-Image-Column");
  const cardDataReferenceDescriptionDropdown = document.querySelector("#card-Data-Reference-detail-form #card-Description-Column");

  /**
 * @type {HTMLSelectElement}
 */
   const instanceBehaviourDropdown = document.querySelector('#instance-Behaviour-Dropdown')


/**
 * @type {HTMLButtonElement}
 */
 const saveRedirectionButton = document.querySelector(
    "#save-Redirection-btn"
); 


/**
 * @type {HTMLButtonElement}
 */
 const saveLoadFragmentButton = document.querySelector(
    "#save-Load-Fragment-btn"
); 


/**
 * @type {HTMLButtonElement}
 */
 const saveiconActionButton = document.querySelector(
    "#save-Icon-Action-btn"
);

/**
 * @type {HTMLButtonElement}
 */
 const savedataReferenceButton = document.querySelector(
    "#save-Data-Reference-btn"
);


/**
 * @type {HTMLButtonElement}
 */
 const saveChipAndAvtarDataReferenceButton = document.querySelector(
    "#save-avtar-Data-Reference-btn"
);

/**
 * @type {HTMLButtonElement}
 */
 const saveCardDataReferenceButton = document.querySelector(
    "#save-Card-Data-Reference-btn"
);

/**
 * @type {HTMLButtonElement}
 */
const saveRedirectToFormAction = document.querySelector("#save-Redirect-To-Form-btn")

/**
 * @type {HTMLButtonElement}
 */
 const saveRedirectToUrlAction = document.querySelector("#save-Redirect-To-Url-btn")

 /**
 * @type {HTMLButtonElement}
 */
const saveTypeJson = document.querySelector("#save-type-Json-btn")

/**
 * @type {HTMLButtonElement}
 */
const saveElementPropertiesButton = document.querySelector(
    "#save-element-properties-btn"
);
/**
 * @type {HTMLButtonElement}
 */
const saveAutofetchDetailButton = document.querySelector(
    "#save-autofetch-detail-btn"
);
/**
 * @type {HTMLButtonElement}
 */
const saveReferenceOptionButton = document.querySelector(
    "#save-reference-option-btn"
);
/**
 * @type {HTMLButtonElement}
 */
const saveCustomOptionButton = document.querySelector(
    "#save-custom-option-btn"
);
/**
 * @type {HTMLButtonElement}
 */
const deleteElementButton = document.querySelector("#delete-element-btn");

/**
 * @type {HTMLFormElement}
 */
const autoSuggestionForm = document.querySelector("#auto-suggestion-form");

/**
 * @type {HTMLSelectElement}
 */
const autoSuggestionTableDropdown = document.querySelector(
    "#auto-suggestion-table"
);

/**
 * @type {HTMLSelectElement}
 */
const autoSuggestionColumnDropdown = document.querySelector(
    "#auto-suggestion-column"
);

/**
 * @type {HTMLButtonElement}
 */
const saveAutoSuggestionButton = document.querySelector(
    "#save-auto-suggestion-btn"
);

/**
 * @type {HTMLButtonElement}
 */
 const saveInstanceBehaviourButton = document.querySelector(
    "#save-Instance-Behaviour-btn"
);

const layoutModalBody = document.querySelector("#layout-modal-body");
const currentLayoutName = document.querySelector("#current-layout");
const actionValueRightSide = document.querySelector("#ActionValueRightSide")

export {
    elementContainer,
    mainContainer,
    propertiesForm,
    deleteElementForm,
    autofetchDetailsForm,
    optionCustomDetailsForm,
    optionReferenceDetailsForm,
    propertiesModalBody,
    tableDropdown,
    columnDropdown,
    whereColumnDropdown,
    primaryElementDropdown,
    optionTableDropdown,
    optionColumnDropdown,
    optionValueElement,
    propertyFieldContainer,
    hintContainer,
    formNameElement,
    formTypeElement,
    saveElementPropertiesButton,
    saveAutofetchDetailButton,
    saveCustomOptionButton,
    saveReferenceOptionButton,
    deleteElementButton,
    autoSuggestionForm,
    autoSuggestionTableDropdown,
    autoSuggestionColumnDropdown,
    saveAutoSuggestionButton,
    layoutModalBody,
    currentLayoutName,
    dataReferenceDetailsForm,
    cardDataReferenceDetailsForm,
    dataReferenceTableDropdown,
    dataReferenceTitleDropdown, 
    dataReferenceSubtitleDropdown,
    dataReferenceImageDropdown,
    savedataReferenceButton,
    cardDataReferenceTableDropdown,
    cardDataReferenceTitleDropdown,
    cardDataReferenceSubtitleDropdown, 
    cardDataReferenceImageDropdown,
    cardDataReferenceDescriptionDropdown,
    saveCardDataReferenceButton,
    typeJsonTextarea,
    typeJsonForm,
    redirectToUrlTextarea, 
    redirectToFormDropdown,
    saveRedirectToFormAction,
    saveRedirectToUrlAction, 
    saveTypeJson,
    redirectToFormForm,
    redirectToUrlForm,
    chipAndAvtarDataReferenceForm,
    chipAndAvtarDataReferenceTableDropdown,
    chipAndAvtarDataReferenceTitleDropdown,
    chipAndAvtarDataReferenceImageDropdown,
    saveChipAndAvtarDataReferenceButton,
    loadFragmentForm,
    saveLoadFragmentButton, 
    loadFragmentDropdown,
    iconActionForm,
    iconActionDropdown,
    saveiconActionButton,
    buttonRedirectionForm,
    redirectionValueDropdown,
    redirectionTypeDropdown,
    saveRedirectionButton,
    redirectionValueTextArea,

    instanceBehaviourForm,
    instanceBehaviourDropdown,
    saveInstanceBehaviourButton,
    actionValueRightSide,

    sectionElementListDropdown,
    optionsQueryTextArea,
    condionalReferenceDetailForm,
    saveConditionalOptionReferenceDetailsButton,

    
};

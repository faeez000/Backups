import QueryParser from "./queryParser.js";

const variables = {
    propertyForm: "#properties-form",
    elementId: "",
    activeFetchType: "",
    autofetchDropdownElement: "#autofetch",
    optionTypeDropdownElement: "#optionType",
    autoSuggestionDropdownElement: "#autoSuggestion",
    formId: QueryParser.getValueOf("formId"),
    formType: QueryParser.getValueOf("type"),
    layoutSection: QueryParser.getValueOf("section"),
    formName: "",
    elementName: QueryParser.getValueOf("formId"),
    field: ".field",
    deleteElementModal: "#delete-element-modal",
    autofetchDetailModal: "#autofetch-details",
    optionCustomDetailsModal: "#option-custom-details-modal",
    optionReferenceDetailsModal: "#option-reference-details-modal",
    autoSuggestionModal: "#auto-suggestion-modal",
    layoutModalId: "#layout-modal",
    nameInputId: "#name",
    dataReference:"#dataReference",
    dataReferenceModal:'#data-Reference-details',
    typeJsonModal:"#type-Json-modal",
    cardDataReference: "#cardDataReference",
    cardDataReferenceModal:"#card-Data-Reference-details",
    actionDropdown:"#action",
    redirectToFormModal:"#redirect-To-Form-modal",
    redirectToUrlModal:"#redirect-To-Url-modal",
    avtarDataReferenceDropdown:"#avtarDataReference",
    chipAndAvtarDataReferenceModal:"#chip-Avtar-Data-Reference-details",
    horizontalChipDataReferenceDropdown:'#chipDataReference',
    iconActionDropdown:"#iconAction",
    loadFragmentModal:"#load-Fragment-modal",
    iconActionModal:"#icon-Action-modal",
    redirectionDropdown:"#actionType",
    redirectionModal:"#redirect-To-CW-Action-modal",
    instanceTypeDropdown:"#instanceType",
    instanceBehaviourModal:'#instance-Behaviour-Modal',
    conditionalReferenceDetailsModal:"#Conditional-reference-details-modal",
   
};

export { variables };
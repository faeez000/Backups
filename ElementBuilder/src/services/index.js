import AutofetchDetailService from "./AutofetchDetailService.js";
import AutoSuggestionDetailService from "./AutoSuggestionDetailService.js";
import ElementBuilderService from "./ElementBuilderService.js";
import ElementService from "./ElementService.js";
import FormService from "./FormService.js";
import OptionDetailService from "./OptionDetailService.js";
import CardDataReferenceService from "./CardDataReferenceService.js";
import DataReferenceService from "./DataReferenceService.js";
import ElementActionService from "./ElementActionService.js";
import ChipAndAvtarDataReferenceService from "./ChipAvtarDataReferenceService.js";
import LoadFragmentService from "./LoadFragmentService.js";
import IconActionRedirectToFormService from "./IconActionRedirectToFormService.js";
import InstanceBehaviourService from "./InstanceBehaviourService.js";
import BottomElementListService from "./BottomElementListService.js";
import UserApiSerivce from "./UserApiSerivce.js";
import ProfileListService from './ProfileListService.js';
import SectionElementListService from './SectionElementListService.js';
import { apiHostController } from "../domain/core/ApiHostController/ApiHostController.js";


const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const elementServiceBaseURL = `${API_DOMAIN_URL}/api/builder/element-builder`,
    autofetchDetailServiceBaseUrl = `${API_DOMAIN_URL}/api/builder/element-builder/autofetch`,
    optionServiceBaseUrl = `${API_DOMAIN_URL}/api/builder/element-builder/option`,
    autoSuggestionServiceBaseUrl = `${API_DOMAIN_URL}/api/builder/element-builder/auto-suggestion`,
    elementBuilderServiceBaseURL = `${API_DOMAIN_URL}/api/details`,
    formDetailServiceBaseURL = `${API_DOMAIN_URL}/api/forms`,
    dataReferenceServiceBaseUrl = `${API_DOMAIN_URL}/api/admin/Datareference`,
    elementActionServiceBaseUrl = `${API_DOMAIN_URL}/api/admin/ElementAction`,
    instanceBehaviourBaseUrl = `${API_DOMAIN_URL}/api/admin/Instance`,
    userApiServiceBaseUrl = `${API_DOMAIN_URL}/api/admin`,
    bottomElementListBaseUrl = `${API_DOMAIN_URL}/api/elementlist`,
    profileListBaseUrl = `${API_DOMAIN_URL}/api/organizationsetting`,
    sectionElementListBaseUrl = `${API_DOMAIN_URL}/api/builder/element-builder`;

const elementService = new ElementService(elementServiceBaseURL);
const elementBuilderService = new ElementBuilderService(
    elementBuilderServiceBaseURL
);
const autofetchDetailService = new AutofetchDetailService(
    autofetchDetailServiceBaseUrl
);
const optionDetailService = new OptionDetailService(optionServiceBaseUrl);
const autoSuggestionDetailService = new AutoSuggestionDetailService(
    autoSuggestionServiceBaseUrl
);

const formService = new FormService(formDetailServiceBaseURL);

const dataReferenceService = new DataReferenceService(
    dataReferenceServiceBaseUrl
);

const cardDataReferenceService = new CardDataReferenceService(
    dataReferenceServiceBaseUrl
);

const elementActionService = new ElementActionService(
    elementActionServiceBaseUrl
);

const chipAndAvtarDataReferenceService = new ChipAndAvtarDataReferenceService(
    dataReferenceServiceBaseUrl
);

const loadFragmentService = new LoadFragmentService(
    elementActionServiceBaseUrl
);

const iconActionRedirectToFormService = new IconActionRedirectToFormService(
    elementActionServiceBaseUrl
);

const instanceBehaviourService = new InstanceBehaviourService(
    instanceBehaviourBaseUrl
);

const getTotalTypeElementListService = new BottomElementListService(
    bottomElementListBaseUrl
);

const userApiService = new UserApiSerivce(userApiServiceBaseUrl);

const profileListService = new ProfileListService(profileListBaseUrl);

const sectionElementListservice = new SectionElementListService(sectionElementListBaseUrl);
export {
    elementService,
    elementBuilderService,
    autofetchDetailService,
    optionDetailService,
    autoSuggestionDetailService,
    formService,
    dataReferenceService,
    cardDataReferenceService,
    elementActionService,
    chipAndAvtarDataReferenceService,
    loadFragmentService,
    iconActionRedirectToFormService,
    instanceBehaviourService,
    userApiService,
    getTotalTypeElementListService,
    profileListService,
    sectionElementListservice,
};

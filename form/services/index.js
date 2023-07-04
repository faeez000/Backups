import { apiHostController } from "../../../shared/core/ApiHostController";
import ElementAPIService from "./ElementAPIService";
import FieldMockService from "./FieldMockService";
import FieldOptionsMockApiService from "./FieldOptionsMockApiService";
import FormAPIService from "./FormAPIService";
import OnChangeQueryApiService from "./OnChangeQueryApiService";

// const fieldOptionsAPIService = new FieldOptionsMockApiService(prodBaseURL);
// const elementAPIService = new ElementAPIService(prodBaseURL);
const formMockService = new FieldMockService();

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);

const fieldOptionsAPIService = new FieldOptionsMockApiService(API_DOMAIN_URL);
const elementAPIService = new ElementAPIService(API_DOMAIN_URL);
const formAPIService = new FormAPIService(API_DOMAIN_URL);
const onChangeQueryApiService = new OnChangeQueryApiService(API_DOMAIN_URL);

export {
    fieldOptionsAPIService,
    elementAPIService,
    formAPIService,
    onChangeQueryApiService,
    formMockService,
};

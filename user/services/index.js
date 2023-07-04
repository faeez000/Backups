import SubscribtionService from "./SubscribtionService";
import { apiHostController } from "../../../shared/core/ApiHostController";

const API_DOMAIN_URL = apiHostController.getApiDomain(window.location.hostname);


const subscriptionService = new SubscribtionService(API_DOMAIN_URL)

export {subscriptionService};